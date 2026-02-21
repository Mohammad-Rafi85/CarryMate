package com.carrymate.repository;

import com.carrymate.entity.TravelerProfile;
import com.carrymate.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelerProfileRepository extends JpaRepository<TravelerProfile, Long> {
    TravelerProfile findByUser(User user);
}
