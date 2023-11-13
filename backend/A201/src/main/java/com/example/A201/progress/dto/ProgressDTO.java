package com.example.A201.progress.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgressDTO {
    private String title;
    private String code;
    private String reason;
    private Long id;//멤버 아이디
}
