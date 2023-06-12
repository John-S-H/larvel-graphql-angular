import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
             selector: 'app-logout',
             template: `
    <h2>Logout</h2>
    <button (click)="logout()">Logout</button>
  `
           })
export class LogoutComponent {
  constructor(private http: HttpClient) { }

  logout(): void {
    this.http.post('http://localhost/api/logout', {}).subscribe(
      (response) => {
        // Logout successful
        console.log('User logged out:', response);
        // Optionally, you can redirect the user to a different page or perform other actions
      },
      (error) => {
        // Logout failed
        console.error('Logout failed:', error);
        // Optionally, you can display an error message to the user
      }
    );
  }
}