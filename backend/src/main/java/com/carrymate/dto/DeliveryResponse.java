package com.carrymate.dto;

import com.carrymate.entity.Delivery;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class DeliveryResponse {
    private Long id;
    private String senderUsername;
    private String travelerUsername;
    private String pickupLocation;
    private String dropLocation;
    private String itemDescription;
    private BigDecimal weightKg;
    private String category;
    private String status;
    private BigDecimal escrowAmount;
    private LocalDateTime createdAt;

    public DeliveryResponse(Delivery delivery) {
        this.id = delivery.getId();
        this.senderUsername = delivery.getSender().getUsername();
        if (delivery.getTraveler() != null) {
            this.travelerUsername = delivery.getTraveler().getUsername();
        }
        this.pickupLocation = delivery.getPickupLocation();
        this.dropLocation = delivery.getDropLocation();
        this.itemDescription = delivery.getItemDescription();
        this.weightKg = delivery.getWeightKg();
        this.category = delivery.getCategory();
        this.status = delivery.getStatus().name();
        this.escrowAmount = delivery.getEscrowAmount();
        this.createdAt = delivery.getCreatedAt();
    }
}
