package com.carrymate.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class PostDeliveryRequest {
    private String pickupLocation;
    private String dropLocation;
    private String itemDescription;
    private BigDecimal weightKg;
    private String category;
    private BigDecimal escrowAmount;
}
