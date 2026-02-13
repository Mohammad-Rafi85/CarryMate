# CarryMate – A Peer-to-Peer Travel-Based Delivery Platform

CarryMate connects senders with travelers to facilitate faster, cheaper, and more flexible deliveries by leveraging existing travel routes.

## Tech Stack
- **Frontend**: React (Vite), Axios, React Router, Framer Motion, Lucide React
- **Backend**: Spring Boot 3, Spring Security, JWT, Hibernate/JPA
- **Database**: MySQL

## Project Structure

### Backend (`/backend`)
- `com.carrymate.entity`: JPA Entities (User, Delivery, Trip, Review)
- `com.carrymate.repository`: Data access layer
- `com.carrymate.service`: Business logic (Matching, OTP, Wallet/Escrow)
- `com.carrymate.controller`: REST Controllers
- `com.carrymate.security`: JWT & Security Configuration
- `com.carrymate.dto`: Data Transfer Objects

### Frontend (`/frontend`)
- `src/api`: Axios configuration with interceptors
- `src/components`: Reusable UI components
- `src/context`: Auth context provider
- `src/pages`: Functional pages (Dashboard, Login, Post Delivery, etc.)

## Database Schema (MySQL)

```sql
CREATE DATABASE carrymate_db;

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
```

## Running Locally

### 1. Prerequisites
- Java 21+
- Node.js & npm
- MySQL Server

### 2. Backend Setup
1. Create a database named `carrymate_db`.
2. Update `backend/src/main/resources/application.properties` with your MySQL username and password.
3. Open terminal in `/backend` and run:
   ```bash
   mvn spring-boot:run
   ```

### 3. Frontend Setup
1. Open terminal in `/frontend` and run:
   ```bash
   npm install
   npm run dev
   ```
2. Open `http://localhost:5173` in your browser.

## Example API Test Requests

### Register a User
- **POST** `/api/auth/signup`
- **Body**:
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "fullName": "John Doe"
  }
  ```

### Login
- **POST** `/api/auth/signin`
- **Body**:
  ```json
  {
    "username": "johndoe",
    "password": "password123"
  }
  ```

### Post a Delivery (Requires JWT)
- **POST** `/api/deliveries`
- **Body**:
  ```json
  {
    "pickupLocation": "New York",
    "dropLocation": "Chicago",
    "itemDescription": "iPhone 15 Pro",
    "weightKg": 0.5,
    "category": "Electronics",
    "escrowAmount": 20.00
  }
  ```
