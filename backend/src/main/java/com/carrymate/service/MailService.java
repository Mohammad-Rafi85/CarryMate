package com.carrymate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    private Map<String, String> otpStore = new HashMap<>();

    public String generateOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpStore.put(email, otp);
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("shaikmirchimohammadrafi@gmail.com");
        message.setTo(email);
        message.setSubject("CarryMate - Registration OTP");
        message.setText("Your OTP for registration on CarryMate is: " + otp + ". It is valid for 5 minutes.");
        
        try {
            mailSender.send(message);
            return "OTP sent successfully";
        } catch (Exception e) {
            return "Error sending email: " + e.getMessage();
        }
    }

    public boolean verifyOtp(String email, String otp) {
        if (otpStore.containsKey(email) && otpStore.get(email).equals(otp)) {
            otpStore.remove(email);
            return true;
        }
        return false;
    }
}
