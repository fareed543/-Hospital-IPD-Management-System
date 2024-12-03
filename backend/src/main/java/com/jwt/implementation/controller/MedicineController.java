package com.jwt.implementation.controller;

import com.jwt.implementation.model.Medicine;
import com.jwt.implementation.model.AdmissionMedicine;
import com.jwt.implementation.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    // Get all medicines
    @GetMapping
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }

    // Get a medicine by ID
    @GetMapping("/{id}")
    public Optional<Medicine> getMedicineById(@PathVariable Long id) {
        return medicineService.getMedicineById(id);
    }

    // Add a new medicine
    @PostMapping
    public Medicine createMedicine(@RequestBody Medicine medicine) {
        return medicineService.saveMedicine(medicine);
    }

    // Update an existing medicine
    @PutMapping("/{id}")
    public Medicine updateMedicine(@PathVariable Long id, @RequestBody Medicine medicineDetails) {
        Medicine medicine = medicineService.getMedicineById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        // Update fields
        medicine.setName(medicineDetails.getName());
        medicine.setDescription(medicineDetails.getDescription());
        medicine.setPrice(medicineDetails.getPrice());

        return medicineService.saveMedicine(medicine);
    }

    // Delete a medicine
    @DeleteMapping("/{id}")
    public void deleteMedicine(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
    }

    // Assign medicine to an admission
    @PostMapping("/assign")
    public AdmissionMedicine assignMedicine(@RequestBody AdmissionMedicine admissionMedicine) {
        return medicineService.assignMedicineToAdmission(admissionMedicine);
    }

    // Get all medicines assigned to a specific admission
    @GetMapping("/admission/{admissionId}")
    public List<AdmissionMedicine> getMedicinesByAdmission(@PathVariable Long admissionId) {
        return medicineService.getMedicinesByAdmission(admissionId);
    }

}
