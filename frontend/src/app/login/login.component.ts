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
  passwordVisible: boolean = false; 

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]], 
      password: ['', [Validators.required, Validators.minLength(3)]], 
    });
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;
      this.authService.login(userName, password).subscribe(
        (response) => {
          localStorage.setItem('role', response.roles[0]);
          localStorage.setItem('userName', response.username);
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible; 
  }
}
