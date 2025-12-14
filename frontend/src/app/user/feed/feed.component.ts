import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  standalone: true,
  selector: 'app-feed',
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feed: any[] = [];
  loading = false;
  error = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeed();
  }

  loadFeed(): void {
    this.loading = true;
    this.error = '';

    this.userService.getFeed().subscribe({
      next: (res: any[]) => {
        this.feed = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load feed';
        this.loading = false;
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  trackByPlanId(index: number, item: any): number {
    return item.id;
  }
}
