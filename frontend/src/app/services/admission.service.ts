import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {
  private baseUrl = environment.apiUrl; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Get the list of all rooms
  getaAdmissionList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}admissions`); // Updated endpoint to fetch rooms
  }

  // Get details of a single room by ID
  getAdmissionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admissions/${id}`); // Updated endpoint for single room
  }

  // Add a new room
  addAdmission(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}admissions`, data); // Updated endpoint for adding a room
  }

  // Update an existing room by ID
  updateMedicine(id: number, roomData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}admissions/${id}`, roomData); // Updated endpoint for updating a room
  }

  // Delete a room by ID
  discharge(id: number, discharge : any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}admissions/${id}`, discharge); // Updated endpoint for deleting a room
  }

  // Method to assign medicines to a patient
  assignMedicines(medicineData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}admissions/assign`, medicineData);
  }

  // Method to assign medicines to a patient
  getMedicinesByAdmission(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}medicines/admission/${id}`);
  }

  // Method to assign medicines to a patient
  assignRoom(admissionId: any, roomId: any, request : any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}admissions/${roomId}/move/${admissionId}`, request);
  }

  // Method to assign medicines to a patient
  getRoomsByAdmission(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admissions/${id}/rooms`);
  }

 
}
