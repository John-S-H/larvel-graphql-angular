import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
             selector: 'app-dashboard',
             templateUrl: './dashboard.component.html',
             styleUrls: ['./dashboard.component.scss']
           })
export class DashboardComponent implements OnInit {
  user: any = {};

  constructor(private authService: AuthService) {}
  ngOnInit() {

    const token = localStorage.getItem('token');

    if (token) {
      this.authService.getUser(token).subscribe(
        (response) => {
          // User data retrieved successfully
          this.user = response;
          console.log('User data:', this.user);
        },
        (error) => {
          // Failed to retrieve user data
          console.error('Failed to get user:', error);
        }
      );
    } else {
      console.error('Token not found in local storage');
    }
  }

}