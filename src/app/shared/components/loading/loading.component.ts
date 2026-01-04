import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-container">
      <div class="spinner-wrapper">
        <div class="spinner"></div>
        <div class="spinner-ring"></div>
      </div>
      <p *ngIf="message" class="loading-message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-2xl);
      min-height: 200px;
    }

    .spinner-wrapper {
      position: relative;
      width: 50px;
      height: 50px;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid var(--background-light);
      border-top-color: var(--primary-color);
      border-right-color: var(--primary-lighter);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      position: relative;
      z-index: 2;
    }

    .spinner-ring {
      position: absolute;
      top: -4px;
      left: -4px;
      width: 50px;
      height: 50px;
      border: 4px solid transparent;
      border-top-color: var(--primary-color);
      border-radius: 50%;
      animation: spin-reverse 1.5s linear infinite;
      opacity: 0.3;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes spin-reverse {
      to {
        transform: rotate(-360deg);
      }
    }

    .loading-message {
      margin-top: var(--spacing-lg);
      color: var(--text-secondary);
      font-family: 'Inter', sans-serif;
      font-size: 0.9375rem;
      font-weight: 500;
      letter-spacing: 0.02em;
    }
  `]
})
export class LoadingComponent {
  @Input() message = 'Cargando...';
}

