package com.carrymate.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class PostTripRequest {
    private String startPoint;
    private String endPoint;
    private LocalDate travelDate;
    private BigDecimal availableCapacityKg;
}
