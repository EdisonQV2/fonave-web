import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <nav class="navbar">
          <div class="navbar-brand">
            <a routerLink="/" class="logo">
              <h1>FONAVE</h1>
              <span class="subtitle">Fondo de Ahorro Familiar</span>
            </a>
          </div>
          <button 
            class="menu-toggle" 
            (click)="toggleMenu()"
            [attr.aria-expanded]="isMenuOpen"
            aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul class="navbar-nav" [class.active]="isMenuOpen">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a></li>
            <li><a routerLink="/about" routerLinkActive="active">Nosotros</a></li>
            <li><a routerLink="/transparency" routerLinkActive="active">Transparencia</a></li>
            <li><a routerLink="/policies" routerLinkActive="active">Políticas</a></li>
            <li><a routerLink="/contact" routerLinkActive="active">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
    }

    .navbar-brand .logo {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: var(--primary-color);
    }

    .navbar-brand h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .subtitle {
      font-size: 0.75rem;
      color: var(--text-secondary);
      font-weight: 400;
    }

    .navbar-nav {
      display: flex;
      list-style: none;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }

    .navbar-nav a {
      color: var(--text-primary);
      font-weight: 500;
      padding: 0.5rem 0;
      transition: color 0.2s ease;
      position: relative;
    }

    .navbar-nav a:hover,
    .navbar-nav a.active {
      color: var(--primary-color);
    }

    .navbar-nav a.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--primary-color);
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }

    .menu-toggle span {
      width: 25px;
      height: 3px;
      background: var(--text-primary);
      transition: all 0.3s ease;
    }

    @media (max-width: 768px) {
      .menu-toggle {
        display: flex;
      }

      .navbar-nav {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        gap: 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .navbar-nav.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .navbar-nav li {
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border-color);
      }

      .navbar-nav li:last-child {
        border-bottom: none;
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

