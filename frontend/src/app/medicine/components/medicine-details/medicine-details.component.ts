import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from 'src/app/services/medicine.service'; // Replace with your medicine service
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.scss']
})
export class MedicineDetailsComponent {
  medicineForm!: FormGroup;
  isEditMode = false;
  selectedMedicineId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private medicineService: MedicineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    const medicineId = this.route.snapshot.paramMap.get('id');
    if (medicineId) {
      this.selectedMedicineId = +medicineId;
      this.isEditMode = true;
      this.loadMedicineDetails();
    }
  }

  // Initialize the form
  initForm() {
    this.medicineForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  // Load medicine details for editing
  loadMedicineDetails() {
    if (this.selectedMedicineId) {
      this.medicineService.getMedicineById(this.selectedMedicineId).subscribe({
        next: (medicineData) => {
          this.medicineForm.patchValue(medicineData);
        },
        error: (err) => console.error('Error loading medicine details', err),
      });
    }
  }

  saveOrUpdateMedicine() {
    if (this.medicineForm.invalid) {
      this.medicineForm.markAllAsTouched();
      return;
    }

    const medicineData: any = this.medicineForm.value;

    if (this.isEditMode && this.selectedMedicineId) {
      // Update medicine
      this.medicineService.updateMedicine(this.selectedMedicineId, medicineData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Updated!',
            text: 'Medicine details updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/medicines/list']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue updating the medicine.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error updating medicine', err);
        },
      });
    } else {
      // Create new medicine
      this.medicineService.addMedicine(medicineData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Created!',
            text: 'Medicine details created successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/medicines/list']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue creating the medicine.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error creating medicine', err);
        },
      });
    }
  }

  // Reset form
  resetForm() {
    this.medicineForm.reset();
    this.isEditMode = false;
    this.selectedMedicineId = null;
  }
}
