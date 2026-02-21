package com.carrymate.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "traveler_profiles")
@Data
@NoArgsConstructor
public class TravelerProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private boolean passportVerified = false;

    private BigDecimal ratingAsTraveler = BigDecimal.ZERO;

    private String preferredCurrency = "USD";

    public TravelerProfile(User user) {
        this.user = user;
    }
}
