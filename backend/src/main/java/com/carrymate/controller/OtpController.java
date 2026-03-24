package com.carrymate.controller;

import com.carrymate.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class OtpController {

    @Autowired
    private MailService mailService;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        String status = mailService.generateOtp(email);
        return ResponseEntity.ok().body(Map.of("message", status));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        if (mailService.verifyOtp(email, otp)) {
            return ResponseEntity.ok().body(Map.of("message", "OTP Verified Successfully"));
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid or Expired OTP"));
        }
    }
}
