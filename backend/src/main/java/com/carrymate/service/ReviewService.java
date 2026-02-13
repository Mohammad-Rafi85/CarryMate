package com.carrymate.service;

import com.carrymate.dto.PostReviewRequest;
import com.carrymate.entity.Delivery;
import com.carrymate.entity.Review;
import com.carrymate.entity.User;
import com.carrymate.repository.DeliveryRepository;
import com.carrymate.repository.ReviewRepository;
import com.carrymate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DeliveryRepository deliveryRepository;

    public Review createReview(PostReviewRequest request, String reviewerUsername) {
        User reviewer = userRepository.findByUsername(reviewerUsername)
                .orElseThrow(() -> new RuntimeException("Reviewer not found"));
        User reviewedUser = userRepository.findById(request.getReviewedUserId())
                .orElseThrow(() -> new RuntimeException("Reviewed user not found"));
        Delivery delivery = deliveryRepository.findById(request.getDeliveryId())
                .orElseThrow(() -> new RuntimeException("Delivery not found"));

        Review review = new Review();
        review.setReviewer(reviewer);
        review.setReviewedUser(reviewedUser);
        review.setDelivery(delivery);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        return reviewRepository.save(review);
    }

    public List<Review> getReviewsForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return reviewRepository.findByReviewedUser(user);
    }
}
