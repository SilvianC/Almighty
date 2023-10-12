package com.example.A201.member.controller;

import com.example.A201.member.dto.MemberDTO;
import com.example.A201.member.service.AuthService;
import com.example.A201.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://localhost:3000")
public class MemberController {
    private final AuthService authService;
    private final MemberService memberService;
    @GetMapping
    public ResponseEntity<List<MemberDTO>> getMembers() {
        List<MemberDTO> members = memberService.getMembers();
        return ResponseEntity.status(HttpStatus.OK).body(members);
    }

    @GetMapping("/member")
    public ResponseEntity<MemberDTO> getUser(@RequestHeader("Authorization") String accessToken) {
        Long id = authService.extractID(accessToken);
        MemberDTO findMember = memberService.getMemberById(id);
        return ResponseEntity.status(HttpStatus.OK).body(findMember);
    }


}
