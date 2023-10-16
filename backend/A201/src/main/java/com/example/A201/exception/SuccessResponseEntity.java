package com.example.A201.exception;


import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;

@Data
@Builder
public class SuccessResponseEntity<E> {
    private String message;
    private E data;
    private Boolean hasNext;

    public static ResponseEntity<SuccessResponseEntity> toResponseEntity(String massage, Object data) {
        return ResponseEntity
                .status(200)
                .body(SuccessResponseEntity.builder()
                        .message(massage)
                        .data(data)
                        .build()
                );
    }
    public static ResponseEntity<SuccessResponseEntity> toResponseEntityPage(String massage, Object data,boolean hasNext) {
        return ResponseEntity
                .status(200)
                .body(SuccessResponseEntity.builder()
                        .message(massage)
                        .data(data)
                        .hasNext(hasNext)
                        .build()
                );
    }
}
