import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http
      .post<any>(`${this.api}/auth/login`, data)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.access_token);
        })
      );
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post(`${this.api}/auth/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
