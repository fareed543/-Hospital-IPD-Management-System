package com.springapp.repository;

import com.springapp.model.AdmissionMedicine;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AdmissionMedicineRepository extends JpaRepository<AdmissionMedicine, Long> {

    // Custom query to find medicines by admission ID
    List<AdmissionMedicine> findByAdmissionId(Long admissionId);
}
