import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { AuthResponse } from './auth-reponse';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { UserModel } from '../access/userModel/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userRole$: Observable<string | null> = this.userRoleSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedRole = this.getFromLocalStorage('userRole');
    this.userRoleSubject.next(storedRole);
  }


  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, { email, password }, { headers: this.headers })
      .pipe(
        map((response: AuthResponse) => {
          if (response.token) {
            this.saveToLocalStorage('authToken', response.token);
            const decodedToken = this.decodeToken(response.token);
            this.saveToLocalStorage('userRole', decodedToken.role);
            this.saveToLocalStorage('user', response.user);
            this.userRoleSubject.next(decodedToken.role);
          }
          return response;
        })
      );
  }

  register(user: { name: string; email: string; password: string; cell: string; address: string; dob: Date; gender: string; image: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`,
      user, { headers: this.headers }).pipe(
        map((response: AuthResponse) => {
          this.saveToLocalStorage('authToken', response.token);
          return response;
        })
      );
  }

  getToken(): string | null {
    return this.getFromLocalStorage('authToken');
  }

  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  getUserProfileFromStorage(): UserModel | null {
    let user: string | null = this.getFromLocalStorage('user');
    return user ? JSON.parse(user) : null;
  }

  getUserRole(): string | null {
    return this.getFromLocalStorage('userRole');
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  isUser(): boolean {
    return this.getUserRole() === 'USER';
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    const expiry = decodedToken.exp * 1000; // Convert expiry to milliseconds
    return Date.now() > expiry;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    }
    this.logout(); // Automatically log out if token is expired
    return false;
  }

  logout(): void {
    this.removeFromLocalStorage('authToken');
    this.removeFromLocalStorage('userRole');
    this.userRoleSubject.next(null); // Clear role in BehaviorSubject
    this.router.navigate(['/login']);
  }

  saveToLocalStorage(key: string, data: any) {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (typeof data === 'string') {
        localStorage.setItem(key, data); // No need to stringify plain strings
      } else {
        localStorage.setItem(key, JSON.stringify(data));
      }
    }
  }
  
  getFromLocalStorage(key: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(key);
      try {
        return JSON.parse(data!); // If it's JSON, parse it
      } catch {
        return data; // If it's a plain string, return it as is
      }
    }
    return null;
  }
  

  removeFromLocalStorage(key: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  }


}
