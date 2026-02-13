package com.carrymate.service;

import com.carrymate.dto.PostDeliveryRequest;
import com.carrymate.entity.Delivery;
import com.carrymate.entity.User;
import com.carrymate.repository.DeliveryRepository;
import com.carrymate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class DeliveryService {
    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private UserRepository userRepository;

    public Delivery createDelivery(PostDeliveryRequest request, String username) {
        User sender = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Delivery delivery = new Delivery();
        delivery.setSender(sender);
        delivery.setPickupLocation(request.getPickupLocation());
        delivery.setDropLocation(request.getDropLocation());
        delivery.setItemDescription(request.getItemDescription());
        delivery.setWeightKg(request.getWeightKg());
        delivery.setCategory(request.getCategory());
        delivery.setEscrowAmount(request.getEscrowAmount());
        delivery.setStatus(Delivery.Status.PENDING);
        delivery.setOtpCode(generateOtp());

        return deliveryRepository.save(delivery);
    }

    public List<Delivery> getDeliveriesBySender(String username) {
        User sender = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return deliveryRepository.findBySender(sender);
    }

    public Delivery matchDelivery(Long deliveryId, String travelerUsername) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
        User traveler = userRepository.findByUsername(travelerUsername)
                .orElseThrow(() -> new RuntimeException("Traveler not found"));
        
        if (delivery.getStatus() != Delivery.Status.PENDING) {
            throw new RuntimeException("Delivery is not available for matching");
        }

        delivery.setTraveler(traveler);
        delivery.setStatus(Delivery.Status.MATCHED);
        
        // Simulate Escrow deduction from Sender
        User sender = delivery.getSender();
        sender.setWalletBalance(sender.getWalletBalance().subtract(delivery.getEscrowAmount()));
        userRepository.save(sender);

        return deliveryRepository.save(delivery);
    }

    public Delivery pickupDelivery(Long deliveryId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
        delivery.setStatus(Delivery.Status.PICKED_UP);
        return deliveryRepository.save(delivery);
    }

    public Delivery completeDelivery(Long deliveryId, String otp) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
        
        if (!delivery.getOtpCode().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        delivery.setStatus(Delivery.Status.DELIVERED);
        
        // Release Escrow to Traveler
        User traveler = delivery.getTraveler();
        traveler.setWalletBalance(traveler.getWalletBalance().add(delivery.getEscrowAmount()));
        userRepository.save(traveler);

        return deliveryRepository.save(delivery);
    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}
