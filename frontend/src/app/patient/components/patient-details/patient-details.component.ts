import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent {
  patientForm!: FormGroup;
  isEditMode = false;
  selectedPatientId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private patientService: PatientService, // Replace with your service
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.selectedPatientId = +patientId;
      this.isEditMode = true;
      this.loadPatientDetails();
    }
  }

  // Initialize the form
  initForm() {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Load patient details for editing
  loadPatientDetails() {
    if (this.selectedPatientId) {
      this.patientService.getPatientsById(this.selectedPatientId).subscribe({
        next: (patientData) => {
          this.patientForm.patchValue(patientData);
        },
        error: (err) => console.error('Error loading patient details', err),
      });
    }
  }

  saveOrUpdatePatient() {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    const patientData: any = this.patientForm.value;

    if (this.isEditMode && this.selectedPatientId) {
      // Update patient
      this.patientService.updatePatients(this.selectedPatientId, patientData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Updated!',
            text: 'Patient details updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/patients/list']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue updating the patient.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error updating patient', err);
        },
      });
    } else {
      // Create new patient
      this.patientService.addPatients(patientData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Created!',
            text: 'Patient details created successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/patients/list']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue creating the patient.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error creating patient', err);
        },
      });
    }
  }

  // Reset form
  resetForm() {
    this.patientForm.reset();
    this.isEditMode = false;
    this.selectedPatientId = null;
  }
}
