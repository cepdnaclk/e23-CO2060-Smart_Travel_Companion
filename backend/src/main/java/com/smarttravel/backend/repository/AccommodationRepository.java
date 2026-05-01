package com.smarttravel.backend.repository;

import com.smarttravel.backend.model.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findByLocationId(Long locationId);
    void deleteByLocationId(Long locationId);
}
