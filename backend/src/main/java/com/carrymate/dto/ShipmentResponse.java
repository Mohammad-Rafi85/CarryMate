package com.carrymate.dto;

import com.carrymate.entity.Shipment;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ShipmentResponse {
    private Long id;
    private Long senderId;
    private String itemName;
    private String itemType;
    private Double weight;
    private String handlingInstructions;
    private String description;
    private String imageUrl;
    private String pickupAddress;
    private Double pickupLat;
    private Double pickupLng;
    private String destinationAddress;
    private Double destinationLat;
    private Double destinationLng;
    private String receiverName;
    private BigDecimal price;
    private Shipment.Status status;
    private LocalDateTime createdAt;
    
    public ShipmentResponse(Shipment shipment) {
        this.id = shipment.getId();
        this.senderId = shipment.getSenderId();
        this.itemName = shipment.getItemName();
        this.itemType = shipment.getItemType();
        this.weight = shipment.getWeight();
        this.handlingInstructions = shipment.getHandlingInstructions();
        this.description = shipment.getDescription();
        this.imageUrl = shipment.getImageUrl();
        this.pickupAddress = shipment.getPickupAddress();
        this.pickupLat = shipment.getPickupLat();
        this.pickupLng = shipment.getPickupLng();
        this.destinationAddress = shipment.getDestinationAddress();
        this.destinationLat = shipment.getDestinationLat();
        this.destinationLng = shipment.getDestinationLng();
        this.receiverName = shipment.getReceiverName();
        this.price = shipment.getPrice();
        this.status = shipment.getStatus();
        this.createdAt = shipment.getCreatedAt();
    }
}
