import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
             selector: 'app-login',
             templateUrl: './login.component.html',
             styleUrls: ['./login.component.scss']
           })
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData.email, loginData.password).subscribe(
      () => {
        // Login successful
        console.log('User logged in');
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      },
      (error) => {
        // Login failed
        console.error('Login failed:', error);
        // Optionally, you can display an error message to the user
      }
    );
  }
}