package com.jwt.implementation.repository;

import com.jwt.implementation.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
}

