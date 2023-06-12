import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
             selector: 'app-navbar',
             templateUrl: './navbar.component.html',
             styleUrls: ['./navbar.component.scss']
           })
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authStatus.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
    console.log('logged in is', this.isLoggedIn);
  }

  logout() {
    console.log('logout');
    this.authService.logout();
    if(this.isLoggedIn){
      console.log('still logged in');
    } else {
      console.log('logged out');
    }
  }
}