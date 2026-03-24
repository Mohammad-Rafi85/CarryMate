package com.carrymate.service;

import com.carrymate.dto.CreateShipmentRequest;
import com.carrymate.dto.ShipmentResponse;
import com.carrymate.entity.Shipment;
import com.carrymate.entity.User;
import com.carrymate.repository.ShipmentRepository;
import com.carrymate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SenderService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private S3Service s3Service;

    public ShipmentResponse createShipment(Long senderId, CreateShipmentRequest request) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        if (!Boolean.TRUE.equals(sender.getKycVerified())) {
            throw new RuntimeException("KYC Verification required to create shipments");
        }

        String imageUrl = s3Service.uploadImage(request.getImageBase64());

        Shipment shipment = new Shipment();
        shipment.setSenderId(senderId);
        shipment.setItemName(request.getItemName());
        shipment.setItemType(request.getItemType());
        shipment.setWeight(request.getWeight());
        shipment.setHandlingInstructions(request.getHandlingInstructions());
        shipment.setDescription(request.getDescription());
        shipment.setImageUrl(imageUrl);
        shipment.setPickupAddress(request.getPickupAddress());
        shipment.setPickupLat(request.getPickupLat());
        shipment.setPickupLng(request.getPickupLng());
        shipment.setDestinationAddress(request.getDestinationAddress());
        shipment.setDestinationLat(request.getDestinationLat());
        shipment.setDestinationLng(request.getDestinationLng());
        shipment.setReceiverName(request.getReceiverName());
        shipment.setSenderContact(request.getSenderContact());
        shipment.setReceiverContact(request.getReceiverContact());
        shipment.setPrice(request.getPrice());
        shipment.setPaymentId(request.getPaymentId());
        shipment.setStatus(Shipment.Status.PENDING);
        shipment.setCreatedAt(LocalDateTime.now());

        Shipment savedShipment = shipmentRepository.save(shipment);
        return new ShipmentResponse(savedShipment);
    }

    public List<ShipmentResponse> getMyShipments(Long senderId) {
        return shipmentRepository.findBySenderId(senderId).stream()
                .map(ShipmentResponse::new)
                .collect(Collectors.toList());
    }

    public ShipmentResponse trackShipment(Long shipmentId, Long senderId) {
        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
                
        if (!shipment.getSenderId().equals(senderId)) {
            throw new RuntimeException("Unauthorized access to shipment");
        }

        return new ShipmentResponse(shipment);
    }

    public List<ShipmentResponse> getAllPendingShipments() {
        return shipmentRepository.findByStatus(Shipment.Status.PENDING).stream()
                .map(ShipmentResponse::new)
                .collect(Collectors.toList());
    }

    public void acceptShipment(Long shipmentId) {
        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
        shipment.setStatus(Shipment.Status.ACCEPTED);
        shipmentRepository.save(shipment);
    }

    public void updateShipmentStatus(Long shipmentId, String status) {
        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
        try {
            shipment.setStatus(Shipment.Status.valueOf(status));
            shipmentRepository.save(shipment);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }
    }
}
