import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [class.hoverable]="hoverable">
      <div class="card-header" *ngIf="title">
        <h3>{{ title }}</h3>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer" *ngIf="footer">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: var(--background);
      border-radius: var(--radius-lg);
      padding: var(--spacing-xl);
      box-shadow: var(--shadow);
      transition: all 0.3s ease;
      border: 1px solid var(--border-color);
      position: relative;
      overflow: hidden;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color) 0%, var(--primary-lighter) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .card.hoverable:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-4px);
      border-color: var(--primary-lighter);
    }

    .card.hoverable:hover::before {
      opacity: 1;
    }

    .card-header {
      margin-bottom: var(--spacing-lg);
      padding-bottom: var(--spacing-md);
      border-bottom: 2px solid var(--border-color);
      position: relative;
    }

    .card-header::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, var(--primary-color) 0%, var(--primary-lighter) 100%);
      border-radius: var(--radius-sm);
    }

    .card-header h3 {
      margin: 0;
      font-size: 1.375rem;
      color: var(--primary-color);
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    .card-body {
      color: var(--text-primary);
      line-height: 1.7;
    }

    .card-footer {
      margin-top: var(--spacing-lg);
      padding-top: var(--spacing-md);
      border-top: 1px solid var(--border-color);
    }
  `]
})
export class CardComponent {
  @Input() title?: string;
  @Input() footer?: boolean;
  @Input() hoverable = true;
}

