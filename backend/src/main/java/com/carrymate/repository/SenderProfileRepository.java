package com.carrymate.repository;

import com.carrymate.entity.SenderProfile;
import com.carrymate.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SenderProfileRepository extends JpaRepository<SenderProfile, Long> {
    SenderProfile findByUser(User user);
}
