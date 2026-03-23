package com.carrymate.repository;

import com.carrymate.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    List<Shipment> findBySenderId(Long senderId);
    List<Shipment> findByStatus(Shipment.Status status);
}
