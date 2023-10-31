package com.example.A201.firebase;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/notification")
public class FCMNotificationApiController {

    private final FCMNotificationService fcmNotificationService;

    @PostMapping
    public String sendNotificationByToken(@RequestBody FCMNotificationRequestDto requestDto) {
        return fcmNotificationService.sendNotificationByToken(requestDto);
    }

    @PostMapping("/firebasetoken/{userId}")
    public ResponseEntity<?> updateFirebase(@RequestBody Map<String,String> firebaseToken, @PathVariable("userId") Long userId) {
        fcmNotificationService.updateFirebase(firebaseToken.get("firebaseToken"),userId);
        System.out.println(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
