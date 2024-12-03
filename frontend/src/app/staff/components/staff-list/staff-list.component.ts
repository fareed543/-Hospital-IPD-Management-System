import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StaffService } from 'src/app/services/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent {
  staffList: any[] = []; 
  searchForm!: FormGroup;

  constructor(private staffService: StaffService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      firstName: [''],
      mobile: [''],
    });

    this.getStaff();
  }

// On search, send the form values to the service method
onSearch(): void {
  const formValues = this.searchForm.value;

  // Call the service method to fetch employees based on the search parameters
  this.staffService.getStaffList(this.searchForm.value.firstName, this.searchForm.value.mobile).subscribe(
    (data) => {
      this.staffList = data; // Update staffList with filtered data
    },
    (error) => {
      console.error('Error fetching employees:', error);
    }
  );
}

// Fetch all employees without any filter
getStaff(): void {
  this.staffService.getStaffList().subscribe(
    (data) => {
      this.staffList = data; // Assign the employee data
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
  
  deleteStaff(staff: any) {
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
        this.staffService.deleteStaff(staff.id).subscribe({
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
