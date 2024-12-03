import { Component } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AdmissionService } from 'src/app/services/admission.service';
import { MedicineDialogComponent } from 'src/app/patient/dialogs/medicine-dialog/medicine-dialog.component';
import { RoomDialogComponent } from 'src/app/patient/dialogs/room-dialog/room-dialog.component';
import { InvoiceDialogComponent } from 'src/app/patient/dialogs/invoice-dialog/invoice-dialog.component';

@Component({
  selector: 'app-admission-list',
  templateUrl: './admission-list.component.html',
  styleUrls: ['./admission-list.component.scss']
})
export class AdmissionListComponent {
  admissionsList: any[] = []; 
  constructor(
    private admissionService: AdmissionService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getaAdmissionsList();
  }



  getaAdmissionsList(): void {
    this.admissionService.getaAdmissionList().subscribe(
      (data) => {
        this.admissionsList = data; // Assign the employee data
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
  
  // delete(staff: any) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: `You are about to delete ${staff.firstName} ${staff.lastName}. This action cannot be undone.`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, keep it',
  //     reverseButtons: true
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Proceed with deletion if confirmed
  //       this.admissionService.discharge(staff.id).subscribe({
  //         next: () => {
  //           Swal.fire('Deleted!', `${staff.firstName} ${staff.lastName} has been deleted.`, 'success');
  //           // Optionally refresh the list or remove the staff from the UI
  //         },
  //         error: (err) => {
  //           Swal.fire('Error!', 'There was an issue deleting the staff.', 'error');
  //           console.error('Error deleting staff', err);
  //         }
  //       });
  //     }
  //   });
  // }

  assignMedicine( admission: any) {
    const dialogRef = this.dialog.open(MedicineDialogComponent, {
      width: '70%',    // Set the width to 70% of the screen width
      height: '70%',   // Set the height to 80% of the screen height
      data: { admission: admission }  // Optional data you want to pass to dialog
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result: ', result);
      // You can process the result from the dialog here if needed
    });
  }


  assignRoom( admission: any) {
    const dialogRef = this.dialog.open(RoomDialogComponent, {
      width: '70%',    // Set the width to 70% of the screen width
      height: '70%',   // Set the height to 80% of the screen height
      data: { admission: admission }  // Optional data you want to pass to dialog
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result: ', result);
      // You can process the result from the dialog here if needed
    });
  }

  invoice( admission: any) {
    const dialogRef = this.dialog.open(InvoiceDialogComponent, {
      width: '70%',    // Set the width to 70% of the screen width
      height: '70%',   // Set the height to 80% of the screen height
      data: { admission: admission }  // Optional data you want to pass to dialog
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result: ', result);
      // You can process the result from the dialog here if needed
    });
  }
  
  
  
  
}

