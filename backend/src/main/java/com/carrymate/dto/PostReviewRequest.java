package com.carrymate.dto;

import lombok.Data;

@Data
public class PostReviewRequest {
    private Long deliveryId;
    private Long reviewedUserId;
    private int rating;
    private String comment;
}
