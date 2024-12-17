package com.springapp.service;

import com.springapp.model.Patient;
import com.springapp.model.AdmissionMedicine;
import com.springapp.repository.PatientRepository;
import com.springapp.repository.AdmissionMedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AdmissionMedicineRepository admissionMedicineRepository;

    // Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get patient by ID
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    // Save a new or updated patient
    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Delete a patient by ID
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }


    // Assign a medicine to a patient
    public AdmissionMedicine assignMedicineToPatient(AdmissionMedicine patientMedicine) {
        return admissionMedicineRepository.save(patientMedicine);
    }
    // Get all medicines assigned to a specific admission
    public List<AdmissionMedicine> getMedicinesByAdmission(Long admissionId) {
        return admissionMedicineRepository.findByAdmissionId(admissionId);
    }

}
