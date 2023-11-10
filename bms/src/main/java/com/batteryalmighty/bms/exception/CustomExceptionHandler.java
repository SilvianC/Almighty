package com.batteryalmighty.bms.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ErrorResponseEntity> handleCustomException(CustomException e) {
        log.error("커스텀 에러 {}",e.getMessage());
        return ErrorResponseEntity.toResponseEntity(e.getErrorCode());
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<?> handleCException(Exception e) {
        log.error("예상치 못한 에러 {}",e.getMessage());
        return ResponseEntity.internalServerError().body(e.getMessage());
    }
}