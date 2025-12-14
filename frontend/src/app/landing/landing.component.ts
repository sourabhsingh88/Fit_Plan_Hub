import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common' ;
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [CommonModule, LoginComponent, RegisterComponent] ,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css' ]
})
export class LandingComponent {
  showLogin = false;
  showRegister = false;

  openLogin() {
    this.showLogin = true;
    this.showRegister = false;
    document.body.style.overflow = 'hidden';
  }

  openRegister() {
    this.showRegister = true;
    this.showLogin = false;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showLogin = false;
    this.showRegister = false;
    document.body.style.overflow = '';
  }

  switchToLogin( ) {
    this.showLogin = true ;
    this.showRegister = false;
  }

  switchToRegister() {
    this.showRegister = true;
    this.showLogin = false;
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.closeModal();
  }
}
