package com.carrymate.controller;

import com.carrymate.dto.DeliveryResponse;
import com.carrymate.dto.PostDeliveryRequest;
import com.carrymate.entity.Delivery;
import com.carrymate.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {
    @Autowired
    private DeliveryService deliveryService;

    @PostMapping
    public ResponseEntity<DeliveryResponse> createDelivery(@RequestBody PostDeliveryRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Delivery delivery = deliveryService.createDelivery(request, username);
        return ResponseEntity.ok(new DeliveryResponse(delivery));
    }

    @GetMapping("/my-requests")
    public ResponseEntity<List<DeliveryResponse>> getMyRequests() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<DeliveryResponse> deliveries = deliveryService.getDeliveriesBySender(username)
                .stream().map(DeliveryResponse::new).collect(Collectors.toList());
        return ResponseEntity.ok(deliveries);
    }

    @PutMapping("/{id}/match")
    public ResponseEntity<DeliveryResponse> matchDelivery(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Delivery delivery = deliveryService.matchDelivery(id, username);
        return ResponseEntity.ok(new DeliveryResponse(delivery));
    }

    @PutMapping("/{id}/pickup")
    public ResponseEntity<DeliveryResponse> pickupDelivery(@PathVariable Long id) {
        Delivery delivery = deliveryService.pickupDelivery(id);
        return ResponseEntity.ok(new DeliveryResponse(delivery));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<DeliveryResponse> completeDelivery(@PathVariable Long id, @RequestParam String otp) {
        Delivery delivery = deliveryService.completeDelivery(id, otp);
        return ResponseEntity.ok(new DeliveryResponse(delivery));
    }
}
