package com.carrymate.dto;

import com.carrymate.entity.Trip;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TripResponse {
    private Long id;
    private String travelerUsername;
    private String startPoint;
    private String endPoint;
    private LocalDate travelDate;
    private BigDecimal availableCapacityKg;

    public TripResponse(Trip trip) {
        this.id = trip.getId();
        this.travelerUsername = trip.getTraveler().getUsername();
        this.startPoint = trip.getStartPoint();
        this.endPoint = trip.getEndPoint();
        this.travelDate = trip.getTravelDate();
        this.availableCapacityKg = trip.getAvailableCapacityKg();
    }
}
