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
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: var(--shadow);
      transition: all 0.2s ease;
    }

    .card.hoverable:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }

    .card-header {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .card-header h3 {
      margin: 0;
      font-size: 1.25rem;
      color: var(--text-primary);
    }

    .card-body {
      color: var(--text-secondary);
    }

    .card-footer {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }
  `]
})
export class CardComponent {
  @Input() title?: string;
  @Input() footer?: boolean;
  @Input() hoverable = true;
}

