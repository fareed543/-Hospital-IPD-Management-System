import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent {
  roomForm!: FormGroup;
  isEditMode = false;
  selectedRoomId: number | null = null;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute, 
    private roomService: RoomService,
    private router: Router) {}

  ngOnInit(): void {
    this.initForm();

    // Check if an 'id' exists in the route parameters
    const roomId = this.route.snapshot.paramMap.get('id');
    if (roomId) {
      this.selectedRoomId = +roomId; // convert to number
      this.isEditMode = true;
      this.loadRoomDetails();
    }
  }

  // Load room details for editing
  loadRoomDetails() {
    if (this.selectedRoomId) {
      this.roomService.getRoomById(this.selectedRoomId).subscribe({
        next: (roomData) => {
          this.roomForm.patchValue(roomData); // Populate form with room data
        },
        error: (err) => console.error('Error loading room details', err),
      });
    }
  }

  // Initialize the form
  initForm() {
    this.roomForm = this.fb.group({
      name: ['', Validators.required],
      charges: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  saveOrUpdateRoom() {
    if (this.roomForm.invalid) {
      this.roomForm.markAllAsTouched();
      return;
    }
  
    const roomData: any = this.roomForm.value;
  
    if (this.isEditMode && this.selectedRoomId) {
      // Update room
      this.roomService.updateRoom(this.selectedRoomId, roomData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Updated!',
            text: 'Room updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Navigate back to room list after successful update
            this.router.navigate(['/rooms/list']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue updating the room.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error updating room', err);
        },
      });
    } else {
      // Create new room
      this.roomService.addRoom(roomData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Created!',
            text: 'Room created successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Navigate back to room list after successful creation
            this.router.navigate(['/rooms/list']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue creating the room.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error creating room', err);
        },
      });
    }
  }

  // Reset form to initial state
  resetForm() {
    this.roomForm.reset();
    this.isEditMode = false;
    this.selectedRoomId = null;
  }
}
