package com.carrymate.controller;

import com.carrymate.dto.CreateShipmentRequest;
import com.carrymate.dto.ShipmentResponse;
import com.carrymate.service.SenderService;
import com.carrymate.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sender")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SenderController {

    @Autowired
    private SenderService senderService;

    @PostMapping("/create-shipment")
    public ResponseEntity<?> createShipment(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody CreateShipmentRequest request) {
            
        try {
            ShipmentResponse response = senderService.createShipment(userDetails.getId(), request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/my-shipments")
    public ResponseEntity<?> getMyShipments(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            List<ShipmentResponse> shipments = senderService.getMyShipments(userDetails.getId());
            return ResponseEntity.ok(shipments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/track/{shipmentId}")
    public ResponseEntity<?> trackShipment(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long shipmentId) {
        try {
            ShipmentResponse response = senderService.trackShipment(shipmentId, userDetails.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all-pending")
    public ResponseEntity<?> getAllPendingShipments() {
        try {
            List<ShipmentResponse> pending = senderService.getAllPendingShipments();
            return ResponseEntity.ok(pending);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<?> acceptShipment(@PathVariable Long id) {
        try {
            senderService.acceptShipment(id);
            return ResponseEntity.ok("Shipment accepted");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateShipmentStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            senderService.updateShipmentStatus(id, status);
            return ResponseEntity.ok("Status updated to " + status);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
