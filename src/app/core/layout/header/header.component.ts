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
      background: var(--background);
      box-shadow: var(--shadow);
      position: sticky;
      top: 0;
      z-index: 1000;
      border-bottom: 1px solid var(--border-color);
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 0;
    }

    .navbar-brand .logo {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: var(--primary-color);
      transition: all 0.2s ease;
    }

    .navbar-brand .logo:hover {
      color: var(--primary-dark);
    }

    .navbar-brand h1 {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 700;
      font-family: 'Poppins', sans-serif;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 0.75rem;
      color: var(--text-secondary);
      font-weight: 400;
      font-family: 'Inter', sans-serif;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-top: 0.125rem;
    }

    .navbar-nav {
      display: flex;
      list-style: none;
      gap: 2.5rem;
      margin: 0;
      padding: 0;
      align-items: center;
    }

    .navbar-nav a {
      color: var(--text-primary);
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      padding: 0.5rem 0;
      transition: all 0.2s ease;
      position: relative;
      font-size: 0.9375rem;
    }

    .navbar-nav a:hover {
      color: var(--primary-color);
    }

    .navbar-nav a.active {
      color: var(--primary-color);
      font-weight: 600;
    }

    .navbar-nav a.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-color) 0%, var(--primary-lighter) 100%);
      border-radius: var(--radius-sm) var(--radius-sm) 0 0;
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: var(--radius-sm);
      transition: background-color 0.2s ease;
    }

    .menu-toggle:hover {
      background-color: var(--background-light);
    }

    .menu-toggle span {
      width: 25px;
      height: 3px;
      background: var(--primary-color);
      transition: all 0.3s ease;
      border-radius: 2px;
    }

    .menu-toggle[aria-expanded="true"] span:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
    }

    .menu-toggle[aria-expanded="true"] span:nth-child(2) {
      opacity: 0;
    }

    .menu-toggle[aria-expanded="true"] span:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
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
        background: var(--background);
        flex-direction: column;
        padding: var(--spacing-md);
        gap: 0;
        box-shadow: var(--shadow-lg);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        border-top: 1px solid var(--border-color);
      }

      .navbar-nav.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .navbar-nav li {
        padding: 0.875rem 0;
        border-bottom: 1px solid var(--border-color);
        width: 100%;
      }

      .navbar-nav li:last-child {
        border-bottom: none;
      }

      .navbar-nav a {
        display: block;
        width: 100%;
        padding: 0.5rem 0;
      }

      .navbar-nav a.active::after {
        display: none;
      }

      .navbar-brand h1 {
        font-size: 1.5rem;
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

