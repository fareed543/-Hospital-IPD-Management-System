package com.jwt.implementation.repository;

import com.jwt.implementation.model.Admission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdmissionRepository extends JpaRepository<Admission, Long> {
}

