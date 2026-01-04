import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { APP_CONFIG } from '../../config/app.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>{{ config.fullName }}</h3>
            <p>Comprometidos con el ahorro familiar y la transparencia.</p>
          </div>
          <div class="footer-section">
            <h4>Enlaces</h4>
            <ul>
              <li><a routerLink="/about">Nosotros</a></li>
              <li><a routerLink="/transparency">Transparencia</a></li>
              <li><a routerLink="/policies">Políticas</a></li>
              <li><a routerLink="/contact">Contacto</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Contacto</h4>
            <ul>
              <li>{{ config.contact.email }}</li>
              <li>{{ config.contact.phone }}</li>
              <li>{{ config.contact.address }}</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} {{ config.fullName }}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%);
      color: white;
      padding: var(--spacing-3xl) 0 var(--spacing-xl);
      margin-top: var(--spacing-3xl);
      position: relative;
      overflow: hidden;
    }

    .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.3;
      pointer-events: none;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-2xl);
      margin-bottom: var(--spacing-2xl);
      position: relative;
      z-index: 1;
    }

    .footer-section h3 {
      margin-bottom: var(--spacing-md);
      color: white;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 1.5rem;
    }

    .footer-section h4 {
      margin-bottom: var(--spacing-md);
      color: white;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 1.125rem;
    }

    .footer-section p {
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.7;
      margin-bottom: var(--spacing-md);
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-section ul li {
      margin-bottom: var(--spacing-sm);
      color: rgba(255, 255, 255, 0.85);
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
    }

    .footer-section a {
      color: rgba(255, 255, 255, 0.85);
      transition: all 0.2s ease;
      text-decoration: none;
      display: inline-block;
    }

    .footer-section a:hover {
      color: white;
      transform: translateX(4px);
      text-decoration: none;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: var(--spacing-lg);
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      font-family: 'Inter', sans-serif;
      font-size: 0.875rem;
      position: relative;
      z-index: 1;
    }

    .footer-bottom p {
      margin: 0;
    }

    @media (max-width: 768px) {
      .footer {
        padding: var(--spacing-2xl) 0 var(--spacing-lg);
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: var(--spacing-xl);
      }

      .footer-section {
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  config = APP_CONFIG;
  currentYear = new Date().getFullYear();
}

