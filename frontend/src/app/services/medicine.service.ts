import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private baseUrl = environment.apiUrl; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Get the list of all rooms
  getMedicineList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}medicines`); // Updated endpoint to fetch rooms
  }

  // Get details of a single room by ID
  getMedicineById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}medicines/${id}`); // Updated endpoint for single room
  }

  // Add a new room
  addMedicine(roomData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}medicines`, roomData); // Updated endpoint for adding a room
  }

  // Update an existing room by ID
  updateMedicine(id: number, roomData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}medicines/${id}`, roomData); // Updated endpoint for updating a room
  }

  // Delete a room by ID
  deleteMedicine(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}medicines/${id}`); // Updated endpoint for deleting a room
  }

  // Method to assign medicines to a patient
  assignMedicines(medicineData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}medicines/assign`, medicineData);
  }

  // Method to assign medicines to a patient
  getPatientMedicines(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}medicines/patient/${id}`);
  }
}
