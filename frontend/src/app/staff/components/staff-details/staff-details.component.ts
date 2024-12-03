import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.scss']
})
export class StaffDetailsComponent implements OnInit {
  staffForm!: FormGroup;
  isEditMode = false;
  selectedStaffId: number | null = null;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute, 
    private staffService: StaffService,
    private router: Router) {}

  ngOnInit(): void {
    this.initForm();

    // Check if an 'id' exists in the route parameters
    const staffId = this.route.snapshot.paramMap.get('id');
    if (staffId) {
      this.selectedStaffId = +staffId; // convert to number
      this.isEditMode = true;
      this.loadStaffDetails();
    }
  }

  // Load staff details for editing
  loadStaffDetails() {
    if (this.selectedStaffId) {
      this.staffService.getStaffById(this.selectedStaffId).subscribe({
        next: (staffData) => {
          this.staffForm.patchValue(staffData); // Populate form with staff data
        },
        error: (err) => console.error('Error loading staff details', err),
      });
    }
  }

  // Initialize the form
  initForm() {
    this.staffForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  saveOrUpdateStaff() {
    if (this.staffForm.invalid) {
      this.staffForm.markAllAsTouched();
      return;
    }
  
    const staffData: any = this.staffForm.value;
  
    if (this.isEditMode && this.selectedStaffId) {
      // Update staff
      this.staffService.updateStaff(this.selectedStaffId, staffData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Updated!',
            text: 'Staff updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Navigate back to staff list after successful update
            this.router.navigate(['/staff/list']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue updating the staff.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error updating staff', err);
        },
      });
    } else {
      // Create new staff
      this.staffService.addStaff(staffData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Created!',
            text: 'Staff created successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Navigate back to staff list after successful creation
            this.router.navigate(['/staff/list']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue creating the staff.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error creating staff', err);
        },
      });
    }
  }
  

  // Reset form to initial state
  resetForm() {
    this.staffForm.reset();
    this.isEditMode = false;
    this.selectedStaffId = null;
  }
}