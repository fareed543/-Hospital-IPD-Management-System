import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MedicineService } from 'src/app/services/medicine.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-medicine-dialog',
  templateUrl: './medicine-dialog.component.html',
  styleUrls: ['./medicine-dialog.component.scss']
})
export class MedicineDialogComponent implements OnInit {
  medicines: { medicineId: number, quantity: number , purchaseDate : string}[] = []; // Array for medicines
  medicineList: any[] = []; // Array to hold the medicine list fetched from the service
  patientId !: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private dialogRef: MatDialogRef<MedicineDialogComponent>
  ) {}

  ngOnInit(): void {
    console.log('Received data: ', this.data.patient);  // Log the data here
    this.loadMedicines(); // Call the service to load the list of medicines
  }

  // Load the list of medicines from the service
  loadMedicines(): void {
    this.medicineService.getMedicineList().subscribe(
      (data) => {
        this.medicineList = data; // Assign the medicine list to the component
      },
      (error) => {
        console.error('Error fetching medicine list:', error);
      }
    );
  }

  onSubmit(): void {
    const admissionId = this.data.admission.id; // Assume the admission ID is passed as part of the dialog data
    const medicinesToAssign = this.medicines.map(medicine => ({
      admission: { id: admissionId },
      medicine: { id: medicine.medicineId },
      quantity: medicine.quantity
    }));
  
    // Call the service method to assign medicines
    this.medicineService.assignMedicines(medicinesToAssign[0]).subscribe(
      (response) => {
        // Success: Show success notification
        Swal.fire({
          title: 'Success!',
          text: 'Medicine assignment successful',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Close the dialog after the success message
          this.dialogRef.close();
        });
      },
      (error) => {
        // Error: Show error notification and do not close the dialog
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while assigning medicines. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  

  // Add a new medicine entry
  addMedicine(): void {
    this.medicines.push({ medicineId: 0, quantity: 1 , purchaseDate : '2024-11-01'});
  }

  // Remove a medicine entry
  removeMedicine(index: number): void {
    this.medicines.splice(index, 1);
  }

  // Cancel the form and close the dialog
  cancel(): void {
    this.dialogRef.close();
    // Close the dialog or reset the form as needed
  }
}
