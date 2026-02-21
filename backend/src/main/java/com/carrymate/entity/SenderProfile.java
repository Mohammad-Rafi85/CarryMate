package com.carrymate.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "sender_profiles")
@Data
@NoArgsConstructor
public class SenderProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String defaultPickupAddress;

    private BigDecimal ratingAsSender = BigDecimal.ZERO;

    public SenderProfile(User user) {
        this.user = user;
    }
}
