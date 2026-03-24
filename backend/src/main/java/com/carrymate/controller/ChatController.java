package com.carrymate.controller;

import com.carrymate.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/api/chat")
    public ResponseEntity<?> getChatResponse(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        if (userMessage == null || userMessage.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Message cannot be empty");
            return ResponseEntity.badRequest().body(error);
        }

        String aiResponse = chatService.getChatResponse(userMessage);
        
        Map<String, String> response = new HashMap<>();
        response.put("response", aiResponse);
        
        return ResponseEntity.ok(response);
    }
}
