package com.carrymate.repository;

import com.carrymate.entity.Trip;
import com.carrymate.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByTraveler(User traveler);
    List<Trip> findByStartPointAndEndPoint(String startPoint, String endPoint);
}
