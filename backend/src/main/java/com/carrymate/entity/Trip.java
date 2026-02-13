package com.carrymate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "trips")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "traveler_id")
    private User traveler;

    private String startPoint;
    private String endPoint;
    private LocalDate travelDate;
    private BigDecimal availableCapacityKg;

    private LocalDateTime createdAt = LocalDateTime.now();
}
