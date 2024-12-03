import { Component } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { StaffService } from 'src/app/services/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {
  roomList: any[] = []; 

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.getStaff();
  }

  getStaff(): void {
    this.roomService.getRoomList().subscribe(
      (data) => {
        this.roomList = data; // Assign the employee data
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
        this.roomService.deleteRoom(staff.id).subscribe({
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
