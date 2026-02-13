package com.carrymate.service;

import com.carrymate.dto.PostTripRequest;
import com.carrymate.entity.Trip;
import com.carrymate.entity.User;
import com.carrymate.repository.TripRepository;
import com.carrymate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {
    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private UserRepository userRepository;

    public Trip createTrip(PostTripRequest request, String username) {
        User traveler = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Trip trip = new Trip();
        trip.setTraveler(traveler);
        trip.setStartPoint(request.getStartPoint());
        trip.setEndPoint(request.getEndPoint());
        trip.setTravelDate(request.getTravelDate());
        trip.setAvailableCapacityKg(request.getAvailableCapacityKg());

        return tripRepository.save(trip);
    }

    public List<Trip> getMyTrips(String username) {
        User traveler = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return tripRepository.findByTraveler(traveler);
    }

    public List<Trip> searchTrips(String start, String end) {
        return tripRepository.findByStartPointAndEndPoint(start, end);
    }
}
