-- Database schema for CarryMate
CREATE DATABASE IF NOT EXISTS carrymate_db;
USE carrymate_db;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE deliveries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT,
    traveler_id BIGINT NULL,
    pickup_location VARCHAR(255) NOT NULL,
    drop_location VARCHAR(255) NOT NULL,
    item_description TEXT,
    weight_kg DECIMAL(5, 2),
    category VARCHAR(50),
    status ENUM('PENDING', 'MATCHED', 'PICKED_UP', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    otp_code VARCHAR(6),
    escrow_amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (traveler_id) REFERENCES users(id)
);

CREATE TABLE trips (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    traveler_id BIGINT,
    start_point VARCHAR(255) NOT NULL,
    end_point VARCHAR(255) NOT NULL,
    travel_date DATE NOT NULL,
    available_capacity_kg DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (traveler_id) REFERENCES users(id)
);

CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reviewer_id BIGINT,
    reviewed_user_id BIGINT,
    delivery_id BIGINT,
    rating INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reviewer_id) REFERENCES users(id),
    FOREIGN KEY (reviewed_user_id) REFERENCES users(id),
    FOREIGN KEY (delivery_id) REFERENCES deliveries(id)
);
