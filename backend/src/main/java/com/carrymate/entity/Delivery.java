package com.carrymate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "deliveries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "traveler_id")
    private User traveler;

    private String pickupLocation;
    private String dropLocation;
    private String itemDescription;
    private BigDecimal weightKg;
    private String category;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private String otpCode;
    private BigDecimal escrowAmount;

    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status {
        PENDING, MATCHED, PICKED_UP, DELIVERED, CANCELLED
    }
}
