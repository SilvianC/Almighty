package com.example.A201.progress.vo;

import com.example.A201.progress.domain.Progress;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProgressResponse {
    private String reason;
    private LocalDateTime date;
    public static ProgressResponse progressResponse(Progress progress){
        return ProgressResponse.builder().reason(progress.getReason()).date(progress.getCreateDate()).build();
    }
}
