package com.smarttravel.backend.repository;

import com.smarttravel.backend.model.Booking;
import com.smarttravel.backend.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByAccommodationIdAndStatusInAndCheckInLessThanEqualAndCheckOutGreaterThanEqual(
            Long accommodationId,
            List<BookingStatus> statuses,
            Timestamp checkOut,
            Timestamp checkIn);
}
