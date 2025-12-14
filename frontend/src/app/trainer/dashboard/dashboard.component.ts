import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil, finalize } from 'rxjs';
import { TrainerService } from '../../core/services/trainer.service';
import { TrainerDashboard } from '../../models/trainer-dashboard.model';

@Component({
  standalone: true,
  selector: 'app-trainer-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboard: TrainerDashboard | null = null;
  loading = false;
  error: string | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private trainerService: TrainerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.error = null;

    this.trainerService
      .getDashboard()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (res) => (this.dashboard = res),
        error: () => (this.error = 'Failed to load trainer dashboard')
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
