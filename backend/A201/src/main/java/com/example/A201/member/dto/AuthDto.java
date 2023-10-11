package com.example.A201.member.dto;

import lombok.*;

public class AuthDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class LoginDto {
        private String loginId;
        private String password;

        @Builder
        public LoginDto(String loginId, String password) {
            this.loginId = loginId;
            this.password = password;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @ToString
    @Builder
    public static class SignupDto {
        private String loginId;
        private String password;
        private String company;

        @Builder
        public SignupDto(String loginId, String password, String company) {
            this.loginId = loginId;
            this.password = password;
            this.company = company;
        }

        public static SignupDto encodePassword(SignupDto signupDto, String encodedPassword) {
            SignupDto newSignupDto = new SignupDto();
            newSignupDto.loginId = signupDto.getLoginId();
            newSignupDto.password = encodedPassword;
            newSignupDto.company = signupDto.getCompany();
            return newSignupDto;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class TokenDto {
        private String accessToken;
        private String refreshToken;

        public TokenDto(String accessToken, String refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }
    }


}
