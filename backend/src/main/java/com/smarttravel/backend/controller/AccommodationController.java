package com.smarttravel.backend.controller;

import com.smarttravel.backend.model.Accommodation;
import com.smarttravel.backend.repository.AccommodationRepository;
import com.smarttravel.backend.repository.BookingRepository;
import com.smarttravel.backend.model.BookingStatus;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accommodations")
public class AccommodationController {

    @Autowired
    private AccommodationRepository accommodationRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping
    public List<Accommodation> getAllAccommodations() {
        return accommodationRepository.findAll();
    }

    @GetMapping("/location/{locationId}")
    public List<Accommodation> getAccommodationsByLocation(@PathVariable Long locationId) {
        return accommodationRepository.findByLocationId(locationId);
    }

    @GetMapping("/available")
    public List<Accommodation> getAvailableAccommodations(
            @RequestParam Long locationId,
            @RequestParam String checkIn,
            @RequestParam String checkOut,
            @RequestParam(required = false) Integer guests
    ) {
        LocalDate inDate = LocalDate.parse(checkIn);
        LocalDate outDate = LocalDate.parse(checkOut);

        // Treat check-in as start of day, check-out as end of day
        Timestamp checkInTs = Timestamp.valueOf(LocalDateTime.of(inDate, java.time.LocalTime.MIDNIGHT));
        Timestamp checkOutTs = Timestamp.valueOf(LocalDateTime.of(outDate, java.time.LocalTime.MAX));

        List<Accommodation> accommodations = accommodationRepository.findByLocationId(locationId);
        List<Accommodation> result = new ArrayList<>();

        List<BookingStatus> statuses = Arrays.asList(BookingStatus.PENDING, BookingStatus.CONFIRMED);

        for (Accommodation acc : accommodations) {
            List<?> overlapping = bookingRepository.findByAccommodationIdAndStatusInAndCheckInLessThanEqualAndCheckOutGreaterThanEqual(
                    acc.getId(), statuses, checkOutTs, checkInTs);

            int booked = overlapping == null ? 0 : overlapping.size();
            int availableRooms = (acc.getTotalRooms() == null ? 0 : acc.getTotalRooms()) - booked;

            if (availableRooms > 0) {
                // Optionally filter by guests - here we assume one room can hold any guests
                result.add(acc);
            }
        }

        return result;
    }
}
