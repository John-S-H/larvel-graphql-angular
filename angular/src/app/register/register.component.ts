import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
             selector:    'app-register',
             templateUrl: './register.component.html',
             styleUrls:   ['./register.component.scss']
           })
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';


  constructor(private http: HttpClient, private router: Router) {
    // Constructor logic...
  }

  registerUser(): void {
    // Create an object with the user registration data
    const userData = {
      name: this.name,
      email:      this.email,
      password:   this.password
    };

    // Make an HTTP POST request to your Laravel API endpoint for user registration
    this.http.post('http://localhost/api/register', userData).subscribe(
      (response) => {
        console.log('User registered:', response);
        // Redirect to the dashboard page
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Registration failed
        console.error('Registration failed:', error);
        // Optionally, you can display an error message to the user
      }
    );
  }


}
