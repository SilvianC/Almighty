package com.example.A201.alarm.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // 널값은 전달하지 않는다
public class PageResponse {
    private String message;
    private Object data;
    private Integer totalPages;
    private Long totalElements;
    private Integer size;
    private Integer number;
    public static PageResponse PageResponse(String message,Page page){
        return PageResponse.builder()
                .message(message)
                .data(page.getContent())
                .number(page.getNumber())
                .totalPages(page.getTotalPages())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .build();
    }

}
