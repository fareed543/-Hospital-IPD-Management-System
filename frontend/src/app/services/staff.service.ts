import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private baseUrl = environment.apiUrl; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getStaffList(firstName: string = '', mobile: string = ''): Observable<any[]> {
    let params = new HttpParams();
  
    if (firstName) {
      params = params.set('firstName', firstName);
    }
    if (mobile) {
      params = params.set('mobile', mobile);
    }
  
    return this.http.get<any[]>(`${this.baseUrl}users/employees`, { params }).pipe(
      catchError(error => {
        console.error('Error fetching staff list', error);
        return throwError(error); // Return the error to the component
      })
    );
  }
  

  // // Get the list of all staff
  // getStaffList(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}users`);
  // }

  // Get details of a single staff member by ID
  getStaffById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}users/${id}`);
  }

  // Add a new staff member
  addStaff(staffData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users`, staffData);
  }

  // Update an existing staff member by ID
  updateStaff(id: number, staffData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}users/${id}`, staffData);
  }

  // Delete a staff member by ID
  deleteStaff(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}users/${id}`);
  }
}
