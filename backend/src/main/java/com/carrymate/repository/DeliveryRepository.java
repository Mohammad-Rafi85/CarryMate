package com.carrymate.repository;

import com.carrymate.entity.Delivery;
import com.carrymate.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> findBySender(User sender);
    List<Delivery> findByTraveler(User traveler);
    List<Delivery> findByStatus(Delivery.Status status);
}
