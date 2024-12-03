import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmissionService } from 'src/app/services/admission.service';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admission-details',
  templateUrl: './admission-details.component.html',
  styleUrls: ['./admission-details.component.scss']
})
export class AdmissionDetailsComponent {
  admissionForm!: FormGroup;
  isEditMode = false;
  selectedAdmissionId: number | null = null;
  patientList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private admissionService: AdmissionService,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getPatientsList();

    const admissionId = this.route.snapshot.paramMap.get('id');
    if (admissionId) {
      this.selectedAdmissionId = +admissionId;
      this.isEditMode = true;
      this.loadAdmissionDetails();
    }
  }

  getPatientsList(): void {
    this.patientService.getPatientsList().subscribe(
      (data) => {
        this.patientList = data;
      },
      (error) => {
        console.error('Error fetching patient list:', error);
      }
    );
  }

  // Custom validator to ensure admissionDate < dischargeDate
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const admissionDate = control.get('admissionDate')?.value;
      const dischargeDate = control.get('dischargeDate')?.value;
      if (admissionDate && dischargeDate && new Date(admissionDate) > new Date(dischargeDate)) {
        return { invalidDateRange: true };
      }
      return null;
    };
  }

  // Initialize the form with the custom validator
  initForm() {
    this.admissionForm = this.fb.group(
      {
        patientId: [null, Validators.required],
        admissionDate: ['', Validators.required],
        dischargeDate: [''],
        status: ['', Validators.required],
        dischargeSummary: ['']
      },
      { validators: this.dateValidator() } // Attach the custom validator to the form
    );
  }

  // Load admission details for editing
  loadAdmissionDetails() {
    if (this.selectedAdmissionId) {
      this.admissionService.getAdmissionById(this.selectedAdmissionId).subscribe({
        next: (admissionData) => {
          this.admissionForm.patchValue({
            patientId: admissionData.patient?.id,
            admissionDate: admissionData.admissionDate,
            dischargeDate: admissionData.dischargeDate,
            status: admissionData.status,
            dischargeSummary: admissionData.dischargeSummary
          });
        },
        error: (err) => console.error('Error loading admission details', err)
      });
    }
  }

  saveOrUpdateAdmission() {
    if (this.admissionForm.invalid) {
      this.admissionForm.markAllAsTouched();
      return;
    }

    const admissionData = {
      patient: {
        id: this.admissionForm.get('patientId')?.value
      },
      admissionDate: this.admissionForm.get('admissionDate')?.value,
      dischargeDate: this.admissionForm.get('dischargeDate')?.value || null,
      status: this.admissionForm.get('status')?.value,
      dischargeSummary: this.admissionForm.get('dischargeSummary')?.value || null
    };

    if (this.isEditMode && this.selectedAdmissionId) {
      this.admissionService.discharge(this.admissionForm.get('patientId')?.value, admissionData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Updated!',
            text: 'Admission details updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/admissions/list']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue updating the admission.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error updating admission', err);
        }
      });
    } else {
      this.admissionService.addAdmission(admissionData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Created!',
            text: 'Admission details created successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/admissions/list']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue creating the admission.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error creating admission', err);
        }
      });
    }
  }

  // Reset form
  resetForm() {
    this.admissionForm.reset();
    this.isEditMode = false;
    this.selectedAdmissionId = null;
  }
}
