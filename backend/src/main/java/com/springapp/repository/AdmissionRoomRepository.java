package com.springapp.repository;

import com.springapp.model.AdmissionRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdmissionRoomRepository extends JpaRepository<AdmissionRoom, Long> {

    List<AdmissionRoom> findByAdmissionId(Long admissionId);
}
