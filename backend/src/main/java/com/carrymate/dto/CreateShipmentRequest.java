package com.carrymate.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CreateShipmentRequest {
    private String itemName;
    private String itemType;
    private Double weight;
    private String handlingInstructions;
    private String description;
    
    // We'll pass image as base64 string or file later, 
    // For now assuming base64 string or we let the controller handle it
    private String imageBase64; 

    private String pickupAddress;
    private Double pickupLat;
    private Double pickupLng;

    private String destinationAddress;
    private Double destinationLat;
    private Double destinationLng;

    private String receiverName;
    private String senderContact;
    private String receiverContact;
    private BigDecimal price;
    private String paymentId;

}
