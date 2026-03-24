package com.carrymate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "shipments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long senderId;

    @Column(nullable = false)
    private String itemName;

    @Column(nullable = false)
    private String itemType;

    @Column(nullable = false)
    private Double weight;

    private String handlingInstructions;

    @Column(nullable = false, length = 1000)
    private String description;

    private String imageUrl;

    @Column(nullable = false)
    private String pickupAddress;

    private Double pickupLat;
    private Double pickupLng;

    @Column(nullable = false)
    private String destinationAddress;

    private Double destinationLat;
    private Double destinationLng;

    @Column(nullable = false)
    private String receiverName;

    private String senderContact;
    
    private String receiverContact;

    @Column(nullable = false)
    private BigDecimal price;

    private String paymentId;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status {
        PENDING, ACCEPTED, PICKED_UP, IN_TRANSIT, DELIVERED
    }
}
