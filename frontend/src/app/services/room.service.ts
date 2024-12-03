import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = environment.apiUrl; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Get the list of all rooms
  getRoomList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}rooms`); // Updated endpoint to fetch rooms
  }

  // Get details of a single room by ID
  getRoomById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}rooms/${id}`); // Updated endpoint for single room
  }

  // Add a new room
  addRoom(roomData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}rooms`, roomData); // Updated endpoint for adding a room
  }

  // Update an existing room by ID
  updateRoom(id: number, roomData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}rooms/${id}`, roomData); // Updated endpoint for updating a room
  }

  // Delete a room by ID
  deleteRoom(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}rooms/${id}`); // Updated endpoint for deleting a room
  }
}
