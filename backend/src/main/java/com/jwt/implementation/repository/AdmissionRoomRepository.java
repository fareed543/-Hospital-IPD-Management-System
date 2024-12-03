package com.jwt.implementation.repository;

import com.jwt.implementation.model.AdmissionRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdmissionRoomRepository extends JpaRepository<AdmissionRoom, Long> {

    List<AdmissionRoom> findByAdmissionId(Long admissionId);
}
