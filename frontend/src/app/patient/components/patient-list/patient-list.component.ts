import { Component } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';
import { MedicineDialogComponent } from '../../dialogs/medicine-dialog/medicine-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {
  patientList: any[] = []; 

  constructor(private patientService: PatientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPatientsList();
  }

  getPatientsList(): void {
    this.patientService.getPatientsList().subscribe(
      (data) => {
        this.patientList = data; // Assign the employee data
      },
      (error) => {
        console.error('Error fetching employee list:', error);
      }
    );
  }


  editEmployee(id: number): void {
    console.log('Edit employee with ID:', id);
    // Navigate to edit page or open a modal for editing
  }
  
  delete(staff: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${staff.firstName} ${staff.lastName}. This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion if confirmed
        this.patientService.deletePatients(staff.id).subscribe({
          next: () => {
            Swal.fire('Deleted!', `${staff.firstName} ${staff.lastName} has been deleted.`, 'success');
            // Optionally refresh the list or remove the staff from the UI
          },
          error: (err) => {
            Swal.fire('Error!', 'There was an issue deleting the staff.', 'error');
            console.error('Error deleting staff', err);
          }
        });
      }
    });
  }


  
  
  
}
