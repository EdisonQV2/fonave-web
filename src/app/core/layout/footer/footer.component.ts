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
      background: var(--text-primary);
      color: white;
      padding: 3rem 0 1rem;
      margin-top: 4rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section h3,
    .footer-section h4 {
      margin-bottom: 1rem;
      color: white;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-section ul li {
      margin-bottom: 0.5rem;
    }

    .footer-section a {
      color: rgba(255, 255, 255, 0.8);
      transition: color 0.2s ease;
    }

    .footer-section a:hover {
      color: white;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1rem;
      text-align: center;
      color: rgba(255, 255, 255, 0.7);
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {
  config = APP_CONFIG;
  currentYear = new Date().getFullYear();
}

