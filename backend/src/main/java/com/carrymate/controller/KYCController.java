package com.carrymate.controller;

import com.carrymate.dto.KYCRequest;
import com.carrymate.dto.MessageResponse;
import com.carrymate.entity.User;
import com.carrymate.repository.UserRepository;
import com.carrymate.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kyc")
@CrossOrigin(origins = "*", maxAge = 3600)
public class KYCController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/verify")
    public ResponseEntity<?> verifyKYC(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody KYCRequest request) {

        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));

        // Mocking DigiLocker Verification
        user.setKycVerified(true);
        user.setKycIdReference(request.getKycIdReference());
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("KYC Verification successful!"));
    }
}
