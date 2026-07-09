package com.smarttravel.backend.controller;

import com.smarttravel.backend.dto.BookingRequest;
import com.smarttravel.backend.model.Booking;
import com.smarttravel.backend.service.BookingService;
import com.smarttravel.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createBooking(Authentication authentication, @RequestBody BookingRequest request) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(401).body("Authentication required");
        }
        Long userId = userRepository.findByEmail(authentication.getName())
                .map(user -> user.getId())
                .orElse(null);
        if (userId == null) {
            return ResponseEntity.status(401).body("Authenticated user not found");
        }

        Booking booking = bookingService.createBooking(userId, request);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/my")
    public List<Booking> getMyBookings(Authentication authentication) {
        Long userId = userRepository.findByEmail(authentication.getName())
                .map(user -> user.getId())
                .orElse(null);
        return bookingService.getBookingsForUser(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long id, Authentication authentication) {
        Booking booking = bookingService.getBookingById(id);
        if (!booking.getUser().getEmail().equals(authentication.getName()) && !authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(booking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id, Authentication authentication) {
        Booking booking = bookingService.getBookingById(id);
        if (!booking.getUser().getEmail().equals(authentication.getName())) {
            return ResponseEntity.status(403).body("You can only cancel your own bookings.");
        }
        bookingService.cancelBooking(id);
        return ResponseEntity.ok().build();
    }
}
