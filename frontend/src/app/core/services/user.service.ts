import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Plan } from '../../models/plan.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFeed(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.api}/users/feed`);
  }
}
