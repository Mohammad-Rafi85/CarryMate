package com.carrymate.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("*")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
        double amountDouble = Double.parseDouble(data.get("amount").toString());
        int amount = (int) Math.round(amountDouble * 100);
        
        RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);
        
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_" + System.currentTimeMillis());
        
        Order order = razorpayClient.orders.create(orderRequest);
        
        Map<String, String> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("currency", "INR");
        response.put("amount", String.valueOf(amount));
        
        return ResponseEntity.ok(response);
    }
}
