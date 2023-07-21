// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authTokenKey = 'token';

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }
}
