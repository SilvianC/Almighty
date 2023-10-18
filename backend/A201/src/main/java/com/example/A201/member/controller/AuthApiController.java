package com.example.A201.member.controller;

import com.example.A201.member.dto.AuthDto;
import com.example.A201.member.dto.MemberDTO;
import com.example.A201.member.service.AuthService;
import com.example.A201.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class AuthApiController {
    private final AuthService authService;
    private final BCryptPasswordEncoder encoder;
    private final MemberService memberService;

    private final long COOKIE_EXPIRATION = 7776000; // 90일

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody AuthDto.SignupDto signupDto) throws Exception {
        String encodedPassword = encoder.encode(signupDto.getPassword());
        AuthDto.SignupDto newSignupDto = AuthDto.SignupDto.encodePassword(signupDto, encodedPassword);
        memberService.registerMember(newSignupDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    // loginId 중복 체크
    @GetMapping("/check/{loginId}")
    public ResponseEntity<?> checkDuplication(@PathVariable String loginId) {
        if (memberService.existsByLoginId(loginId)) {
            return ResponseEntity.status(HttpStatus.OK).body("이미 사용 중인 loginId 입니다.");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body("사용 가능한 loginId 입니다.");
        }
    }
    // 로그인 -> 토큰 발급
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthDto.LoginDto loginDto) {
        // User 등록 및 Refresh Token 저장
//        loginDto.setPassword("{noop}" + loginDto.getPassword());
        AuthDto.TokenDto tokenDto = authService.login(loginDto);

        String loginId = loginDto.getLoginId();
        MemberDTO member = memberService.getMemberByLoginId(loginId);

        // RT 저장
//        HttpCookie httpCookie = ResponseCookie.from("refresh-token", tokenDto.getRefreshToken())
//                .maxAge(COOKIE_EXPIRATION)
//                .httpOnly(true)
//                .secure(true)
//                .build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .header("REFRESH_TOKEN", tokenDto.getRefreshToken())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDto.getAccessToken())
                .body(member);

/*
        return ResponseEntity.ok()
//                .header("REFRESH_TOKEN", httpCookie.toString())
                .header("REFRESH_TOKEN", tokenDto.getRefreshToken())
                // AT 저장
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDto.getAccessToken())
                .build();
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("이메일 인증 안됨");
*/
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestHeader("Authorization") String requestAccessToken) {
        if (!authService.validate(requestAccessToken)) {
            return ResponseEntity.status(HttpStatus.OK).build(); // 재발급 필요X
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 재발급 필요
        }
    }
    // 토큰 재발급
    @PostMapping("/reissue")
//    public ResponseEntity<?> reissue(@CookieValue(name = "refresh-token") String requestRefreshToken,
    public ResponseEntity<?> reissue(@RequestHeader() Map<String, String> headers) {
        System.out.println("headers: "+headers);
        String requestAccessToken = headers.get("authorization");
        String requestRefreshToken = headers.get("refresh_token");
        AuthDto.TokenDto reissuedTokenDto = authService.reissue(requestAccessToken, requestRefreshToken);

        if (reissuedTokenDto != null) { // 토큰 재발급 성공
            // RT 저장
//            ResponseCookie responseCookie = ResponseCookie.from("refresh-token", reissuedTokenDto.getRefreshToken())
//                    .maxAge(COOKIE_EXPIRATION)
//                    .httpOnly(true)
//                    .secure(true)
//                    .build();
            return ResponseEntity
                    .status(HttpStatus.OK)
//                    .header("REFRESH_TOKEN", responseCookie.toString())
                    .header("REFRESH_TOKEN", reissuedTokenDto.getRefreshToken())
                    // AT 저장
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + reissuedTokenDto.getAccessToken())
                    .build();

        } else { // Refresh Token 탈취 가능성
            System.out.println("재로그인 유도");
            // Cookie 삭제 후 재로그인 유도
//            ResponseCookie responseCookie = ResponseCookie.from("refresh-token", "")
//                    .maxAge(0)
//                    .path("/")
//                    .build();
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
//                    .header("REFRESH_TOKEN", responseCookie.toString())
                    .header("REFRESH_TOKEN", "")
                    .build();
        }
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String requestAccessToken) {
        authService.logout(requestAccessToken);
//        ResponseCookie responseCookie = ResponseCookie.from("refresh-token", "")
//                .maxAge(0)
//                .path("/")
//                .build();

        return ResponseEntity
                .status(HttpStatus.OK)
//                .header("REFRESH_TOKEN", responseCookie.toString())
                .header("REFRESH_TOKEN", "")
                .build();
    }

}
