package com.example.A201.member.service;

import com.example.A201.member.domain.Member;
import com.example.A201.member.dto.AuthDto;
import com.example.A201.member.dto.MemberDTO;
import com.example.A201.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder encoder;

    public MemberDTO getMemberById(Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(()->new NoSuchElementException("존재하지 않는 유저입니다."));
        MemberDTO dto = MemberDTO.builder()
                .createDate(member.getCreateDate())
                .memberId(member.getMemberId())
                .role(member.getRole())
                .loginId(member.getLoginId())
                .password(member.getPassword())
                .tel(member.getTel())
                .email(member.getEmail())
                .is_activated(member.getIs_activated())
                .company(member.getCompany())
                .build();
        return dto;
    }

    public Member getMemberByLoginId(String loginId){
        return memberRepository.findByLoginId(loginId).orElse(null);
    }

    @Transactional
    public void registerMember(AuthDto.SignupDto signupDto) throws Exception{
        System.out.println(signupDto);
        Member member = Member.registerMember(signupDto);
        memberRepository.save(member);
    }

    public List<MemberDTO> getMembers(){
        List<Member> members = memberRepository.findAll();
        return members.stream().map(member->MemberDTO.builder()
                .createDate(member.getCreateDate())
                .memberId(member.getMemberId())
                .role(member.getRole())
                .loginId(member.getLoginId())
                .tel(member.getTel())
                .email(member.getEmail())
                .is_activated(member.getIs_activated())
                .company(member.getCompany())
                .build()).collect(Collectors.toList());
    }

    @Transactional
    public void passwordInit(String loginId){
        Member member = memberRepository.findByLoginId(loginId).orElseThrow(() -> new NoSuchElementException("존재하지 않는 유저입니다."));
        String password = makePassword();
        member.update(encoder.encode(password));
    }

    private String makePassword() {
        String uuid = "";
        for (int i = 0; i < 5; i++) {
            uuid = UUID.randomUUID().toString().replaceAll("-", ""); // -를 제거해 주었다.
            uuid = uuid.substring(0, 10); //uuid를 앞에서부터 10자리 잘라줌.
        }
        return uuid;
    }

    public boolean existsByLoginId(String loginId) {
        return memberRepository.findByLoginId(loginId).isPresent();
    }

}
