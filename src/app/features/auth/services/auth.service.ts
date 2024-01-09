import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  removeToken(): void {
    localStorage.removeItem('token')
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    return !!token
  }
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = tokenData.exp * 1000;
      return Date.now() >= expirationTime;
    }
    return true; 
  }
}
