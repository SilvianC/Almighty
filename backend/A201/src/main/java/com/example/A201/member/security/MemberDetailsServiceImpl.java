package com.example.A201.member.security;

import com.example.A201.member.domain.Member;
import com.example.A201.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberDetailsServiceImpl implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public MemberDetailsImpl loadUserByUsername(String loginId) throws UsernameNotFoundException {
        Member findMember = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new UsernameNotFoundException("Can't find user with this loginId. -> " + loginId));
        if(findMember != null){
            MemberDetailsImpl memberDetails = new MemberDetailsImpl(findMember);
            return memberDetails;
        }

        return null;
    }
}
