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

    const staffId = this.route.snapshot.paramMap.get('id');
    if (staffId) {
      this.selectedStaffId = +staffId;
      this.isEditMode = true;
      this.loadStaffDetails();
    }
  }

  loadStaffDetails() {
    if (this.selectedStaffId) {
      this.staffService.getStaffById(this.selectedStaffId).subscribe({
        next: (staffData) => {
          this.staffForm.patchValue(staffData.data);
        },
        error: (err) => console.error('Error loading staff details', err),
      });
    }
  }

  initForm() {
    this.staffForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      role: ['', Validators.required]
    });
  }

  saveOrUpdateStaff() {
    if (this.staffForm.invalid) {
      this.staffForm.markAllAsTouched();
      return;
    }

    const staffData: any = this.staffForm.value;

    if (this.isEditMode && this.selectedStaffId) {
      this.staffService.updateStaff(this.selectedStaffId, staffData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Updated!',
            text: 'Staff updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
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
      this.staffService.addStaff(staffData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Created!',
            text: 'Staff created successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
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

  resetForm() {
    this.staffForm.reset();
    this.isEditMode = false;
    this.selectedStaffId = null;
  }
}
