import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { AdmissionService } from 'src/app/services/admission.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.scss']
})
export class InvoiceDialogComponent implements OnInit {
  admissionsList : any = [];
  roomsList : any = [];
  medicinesList : any = [];
  loading = true;  // For showing loading state
  admissionId!: number; // Example admission ID, this will come from the admission data or routing params

  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient, private admissionService: AdmissionService) { 

    }

  ngOnInit(): void {
    this.admissionId = this.data.admission.id; // Assume the admission ID is passed as part of the dialog data

    // Fetch data when the component is initialized
    this.fetchAdmissionsData();
    this.fetchMedicineData();
    this.fetchRoomData();
  }

  // Fetch admission data (you can implement this based on your API)
  fetchAdmissionsData(): void {
    this.admissionService.addAdmission(this.admissionId).subscribe(
      (response :any ) => {
        this.admissionsList = response;
        console.log('Admissions Data:', this.admissionsList);
        this.loading = false; // Set loading to false once data is fetched
      },
      (error :any ) => {
        console.error('Error fetching admission data:', error);
        this.loading = false;
      }
    );
  }

  // Fetch medicine data by admission ID
  fetchMedicineData(): void {
    this.admissionService.getMedicinesByAdmission(this.admissionId).subscribe(
      (response :any ) => {
        this.medicinesList = response;  // Update the medicines list with the response data
        console.log('Medicine Data:', this.medicinesList);
      },
      (error:any )  => {
        console.error('Error fetching medicine data:', error);
      }
    );
  }

  // Fetch room data by admission ID
  fetchRoomData(): void {
    this.admissionService.getRoomsByAdmission(this.admissionId).subscribe(
      (response :any ) => {
        this.roomsList = response;  // Update the rooms list with the response data
        console.log('Room Data:', this.roomsList);
      },
      (error) => {
        console.error('Error fetching room data:', error);
      }
    );
  }

// Method to calculate the grand total for medicines
get grandTotalMedicines(): number {
  return this.medicinesList.reduce((total: number, medicine: any) => {
    return total + (medicine.medicine.price * medicine.quantity);
  }, 0);
}

// Method to calculate the grand total for rooms
get grandTotalRooms(): number {
  return this.roomsList.reduce((total: number, room: any) => {
    return total + (room.room.charges * room.days);
  }, 0);
}


  // Overall Grand Total (sum of rooms and medicines)
  get overallGrandTotal(): number {
    return this.grandTotalMedicines + this.grandTotalRooms;
  }
}
