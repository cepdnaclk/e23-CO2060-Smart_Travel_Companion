package com.smarttravel.backend.controller;

import com.smarttravel.backend.model.Accommodation;
import com.smarttravel.backend.repository.AccommodationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accommodations")
public class AccommodationController {

    @Autowired
    private AccommodationRepository accommodationRepository;

    @GetMapping
    public List<Accommodation> getAllAccommodations() {
        return accommodationRepository.findAll();
    }

    @GetMapping("/location/{locationId}")
    public List<Accommodation> getAccommodationsByLocation(@PathVariable Long locationId) {
        return accommodationRepository.findByLocationId(locationId);
    }
}
