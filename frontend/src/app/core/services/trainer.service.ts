import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TrainerDashboard } from '../../models/trainer-dashboard.model';

@Injectable({ providedIn: 'root' })
export class TrainerService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get<TrainerDashboard>(`${this.api}/trainer/dashboard`);
  }
}
