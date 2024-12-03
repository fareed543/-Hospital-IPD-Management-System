import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService : AuthService) {}

  ngOnInit(): void {
    // Initialize the form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email field with validation
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field with validation
    });
  }

  // Submit method
  onSubmit(): void {
    if (this.loginForm.valid) {
     
      localStorage.setItem('authToken', "1234");
      this.router.navigate(['/dashboard']); 

      // const { email, password } = this.loginForm.value;
      // this.authService.login(email, password).subscribe(
      //   (response) => {
      //     console.log('Login successful', response);

      //     localStorage.setItem('authToken', response.token);
      //     this.router.navigate(['/dashboard']); 

      //   },
      //   (error) => {
      //     console.error('Login failed', error);
      //     // Handle login failure, e.g., show an error message to the user
      //   }
      // );

    } else {
      console.log('Form is not valid');
    }
  }
}
