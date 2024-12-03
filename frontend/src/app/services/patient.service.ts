import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = environment.apiUrl; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Get the list of all rooms
  getPatientsList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}patients`); // Updated endpoint to fetch rooms
  }

  // Get details of a single room by ID
  getPatientsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}patients/${id}`); // Updated endpoint for single room
  }

  // Add a new room
  addPatients(roomData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}patients`, roomData); // Updated endpoint for adding a room
  }

  // Update an existing room by ID
  updatePatients(id: number, roomData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}patients/${id}`, roomData); // Updated endpoint for updating a room
  }

  // Delete a room by ID
  deletePatients(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}patients/${id}`); // Updated endpoint for deleting a room
  }
}
