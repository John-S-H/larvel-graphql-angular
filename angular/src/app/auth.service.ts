import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
              providedIn: 'root'
            })
export class AuthService {
  private baseUrl = 'http://localhost/api';
  private authStatusSubject: BehaviorSubject<boolean>;
  public authStatus: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.authStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    this.authStatus = this.authStatusSubject.asObservable();
  }

  registerUser(userData: any) {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  getUser(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/user`, { headers });
  }

  login(email: string, password: string) {
    const credentials = { email, password };

    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        const token = response.token;
        // Store the token in the local storage
        localStorage.setItem('token', token);
        this.authStatusSubject.next(true); // Notify subscribers about login status change
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authStatusSubject.next(false); // Notify subscribers about login status change
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}