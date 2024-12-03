import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Login method
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/auth/login`, body);  // POST request to the login endpoint
  }

  // Logout method
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {});  // POST request to logout endpoint
  }

  // Optional: Check if the user is authenticated (based on token)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
