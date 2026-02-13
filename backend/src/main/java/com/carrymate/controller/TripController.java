package com.carrymate.controller;

import com.carrymate.dto.PostTripRequest;
import com.carrymate.dto.TripResponse;
import com.carrymate.entity.Trip;
import com.carrymate.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/trips")
public class TripController {
    @Autowired
    private TripService tripService;

    @PostMapping
    public ResponseEntity<TripResponse> createTrip(@RequestBody PostTripRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Trip trip = tripService.createTrip(request, username);
        return ResponseEntity.ok(new TripResponse(trip));
    }

    @GetMapping("/my-trips")
    public ResponseEntity<List<TripResponse>> getMyTrips() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<TripResponse> trips = tripService.getMyTrips(username)
                .stream().map(TripResponse::new).collect(Collectors.toList());
        return ResponseEntity.ok(trips);
    }

    @GetMapping("/search")
    public ResponseEntity<List<TripResponse>> searchTrips(@RequestParam String start, @RequestParam String end) {
        List<TripResponse> trips = tripService.searchTrips(start, end)
                .stream().map(TripResponse::new).collect(Collectors.toList());
        return ResponseEntity.ok(trips);
    }
}
