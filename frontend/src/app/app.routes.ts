import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: 'trainer',
    loadChildren: () => import('./trainer/trainer.routes'),
    canActivate: [authGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.routes'),
    canActivate: [authGuard]
  }
];
