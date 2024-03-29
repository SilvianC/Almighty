package com.example.A201.member.service;

import com.example.A201.member.dto.AuthDto;
import com.example.A201.member.dto.MemberDTO;
import com.example.A201.member.exception.MemberException;
import com.example.A201.member.exception.NotActivatedException;
import com.example.A201.member.exception.PasswordException;
import com.example.A201.member.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RedisService redisService;
    private final BCryptPasswordEncoder encoder;
    private final MemberService memberService;

    private final String SERVER = "Server";

    @Transactional
    public AuthDto.TokenDto login(AuthDto.LoginDto loginDto) {

        MemberDTO member = memberService.getMemberByLoginId(loginDto.getLoginId());

        if (member == null) throw new MemberException("아이디 또는 비밀번호가 틀렸습니다.");

        if (!encoder.matches(loginDto.getPassword(), member.getPassword())) throw new PasswordException("아이디 또는 비밀번호가 틀렸습니다.");

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getLoginId(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject()
                .authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        if (memberService.getMemberByLoginId(loginDto.getLoginId()).getIs_activated() != true) {
            throw new NotActivatedException("탈퇴한 회원입니다.");
        }

        return generateToken(SERVER, authentication.getName(), getAuthorities(authentication));
    }

    // AT가 만료일자만 초과한 유효한 토큰인지 검사
    public boolean validate(String requestAccessTokenInHeader) {
        String requestAccessToken = resolveToken(requestAccessTokenInHeader);
        return jwtTokenProvider.validateAccessTokenOnlyExpired(requestAccessToken); // true = 재발급
    }


    @Transactional
    public AuthDto.TokenDto reissue(String requestAccessTokenInHeader, String requestRefreshToken) {
        String requestAccessToken = resolveToken(requestAccessTokenInHeader);

        System.out.println("requestRefreshToken "+requestRefreshToken);
        System.out.println("requestAccessToken "+requestAccessToken);

        Authentication authentication = jwtTokenProvider.getAuthentication(requestAccessToken);
        String principal = getPrincipal(requestAccessToken);

        String refreshTokenInRedis = redisService.getValues("RT(" + SERVER + "):" + principal);

        if (refreshTokenInRedis == null) { // Redis에 저장되어 있는 RT가 없을 경우
            return null; // -> 재로그인 요청
        }

        // 요청된 RT의 유효성 검사 & Redis에 저장되어 있는 RT와 같은지 비교
        if(!jwtTokenProvider.validateRefreshToken(requestRefreshToken) || !refreshTokenInRedis.equals(requestRefreshToken)) {
            redisService.deleteValues("RT(" + SERVER + "):" + principal); // 탈취 가능성 -> 삭제
            log.info("리프레시 토큰 유효성 검사");
            return null; // -> 재로그인 요청
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String authorities = getAuthorities(authentication);

        // 토큰 재발급 및 Redis 업데이트
        redisService.deleteValues("RT(" + SERVER + "):" + principal); // 기존 RT 삭제
        AuthDto.TokenDto tokenDto = jwtTokenProvider.createToken(principal, authorities);
        saveRefreshToken(SERVER, principal, tokenDto.getRefreshToken());
        log.info("리이슈 로직 완료");
        return tokenDto;
    }

    @Transactional
    public AuthDto.TokenDto generateToken(String provider, String loginId, String authorities) {
        // RT가 이미 있을 경우
        if(redisService.getValues("RT(" + provider + "):" + loginId) != null) {
            redisService.deleteValues("RT(" + provider + "):" + loginId); // 삭제
        }

        // AT, RT 생성 및 Redis에 RT 저장
        AuthDto.TokenDto tokenDto = jwtTokenProvider.createToken(loginId, authorities);
        saveRefreshToken(provider, loginId, tokenDto.getRefreshToken());
        return tokenDto;
    }

    // RT를 Redis에 저장
    @Transactional
    public void saveRefreshToken(String provider, String principal, String refreshToken) {
        redisService.setValuesWithTimeout("RT(" + provider + "):" + principal, // key
                refreshToken, // value
                jwtTokenProvider.getTokenExpirationTime(refreshToken)); // timeout(milliseconds)
    }

    // 권한 이름 가져오기
    public String getAuthorities(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
    }

    // AT로부터 principal 추출
    public String getPrincipal(String requestAccessToken) {
        return jwtTokenProvider.getAuthentication(requestAccessToken).getName();
    }

    // "Bearer {AT}"에서 {AT} 추출
    public String resolveToken(String requestAccessTokenInHeader) {
        if (requestAccessTokenInHeader != null && requestAccessTokenInHeader.startsWith("Bearer ")) {
            return requestAccessTokenInHeader.substring(7);
        }
        return null;
    }

    public Long extractID(String accessToken) {
        String token = resolveToken(accessToken);
        return Long.parseLong(jwtTokenProvider.getClaims(token).get("member_id").toString());
    }

    // 로그아웃
    @Transactional
    public void logout(String requestAccessTokenInHeader, String memberId) {
        String requestAccessToken = resolveToken(requestAccessTokenInHeader);
        String principal = getPrincipal(requestAccessToken);

        // Redis에 저장되어 있는 RT 삭제
        String refreshTokenInRedis = redisService.getValues("RT(" + SERVER + "):" + principal);
        String fcmToken = redisService.getValues(memberId);
        log.info("fcm {}",fcmToken);
        if(fcmToken != null){
            redisService.deleteValues(memberId);
        }
        if (refreshTokenInRedis != null) {
            redisService.deleteValues("RT(" + SERVER + "):" + principal);
        }

        // Redis에 로그아웃 처리한 AT 저장
//        long expiration = jwtTokenProvider.getTokenExpirationTime(requestAccessToken) - new Date().getTime();
//        redisService.setValuesWithTimeout(requestAccessToken,
//                "logout",
//                expiration);
    }

}
