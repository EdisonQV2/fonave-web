import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IndicatorGroup } from '../../core/models/indicator.model';
import { IndicatorService } from '../../core/services/indicator.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';
import { TrackByUtil } from '../../shared/utils/track-by.util';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardComponent,
    LoadingComponent,
    CurrencyFormatPipe
  ],
  template: `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Juan Pablo Q, Bienvenido a FONAVE</h1>
          <p class="hero-subtitle">Fondo de Ahorro Familiar</p>
          <p class="hero-description">
            Comprometidos con el crecimiento del ahorro familiar y la transparencia en la gestión de recursos.
          </p>
          <div class="hero-actions">
            <a routerLink="/about" class="btn btn-primary">Conoce más</a>
            <a routerLink="/transparency" class="btn btn-secondary">Transparencia</a>
          </div>
        </div>
      </div>
    </section>

    <section class="indicators-section section">
      <div class="container">
        <h2>Indicadores Generales</h2>
        <div *ngIf="indicators$ | async as indicators; else loading">
          <div class="indicators-grid">
            <app-card
              *ngFor="let group of indicators; trackBy: trackByGroup"
              [title]="group.title"
              class="indicator-group">
              <div class="indicators-list">
                <div
                  *ngFor="let indicator of group.indicators; trackBy: trackById"
                  class="indicator-item">
                  <div class="indicator-header">
                    <span class="indicator-name">{{ indicator.name }}</span>
                    <span
                      *ngIf="indicator.trend"
                      class="trend"
                      [class.trend-up]="indicator.trend === 'up'"
                      [class.trend-down]="indicator.trend === 'down'"
                      [class.trend-stable]="indicator.trend === 'stable'">
                      {{ getTrendIcon(indicator.trend) }}
                    </span>
                  </div>
                  <div class="indicator-value">
                    {{ indicator.value }}
                    <span *ngIf="indicator.unit" class="indicator-unit">{{ indicator.unit }}</span>
                  </div>
                  <p *ngIf="indicator.description" class="indicator-description">
                    {{ indicator.description }}
                  </p>
                </div>
              </div>
            </app-card>
          </div>
        </div>
        <ng-template #loading>
          <app-loading></app-loading>
        </ng-template>
      </div>
    </section>

    <section class="features-section section">
      <div class="container">
        <h2>Nuestros Servicios</h2>
        <div class="features-grid">
          <app-card title="Transparencia">
            <p>Acceso a información clara y actualizada sobre el estado del fondo.</p>
            <a routerLink="/transparency" class="btn btn-primary">Ver más</a>
          </app-card>
          <app-card title="Políticas">
            <p>Conoce nuestras políticas y procedimientos operativos.</p>
            <a routerLink="/policies" class="btn btn-primary">Ver más</a>
          </app-card>
          <app-card title="Contacto">
            <p>Estamos aquí para ayudarte. Contáctanos cuando lo necesites.</p>
            <a routerLink="/contact" class="btn btn-primary">Contactar</a>
          </app-card>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 50%, var(--primary-light) 100%);
      color: white;
      padding: var(--spacing-3xl) 0;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 50%, rgba(111, 191, 115, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(141, 110, 99, 0.1) 0%, transparent 50%);
      pointer-events: none;
    }

    .hero-content {
      position: relative;
      z-index: 1;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      margin-bottom: var(--spacing-md);
      color: white;
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      letter-spacing: -0.02em;
    }

    .hero-subtitle {
      font-size: 1.75rem;
      margin-bottom: var(--spacing-md);
      opacity: 0.95;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.95);
    }

    .hero-description {
      font-size: 1.25rem;
      max-width: 700px;
      margin: 0 auto var(--spacing-2xl);
      opacity: 0.9;
      font-family: 'Inter', sans-serif;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.9);
    }

    .hero-actions {
      display: flex;
      gap: var(--spacing-md);
      justify-content: center;
      flex-wrap: wrap;
    }

    .indicators-section {
      background: var(--background-light);
    }

    .indicators-section h2 {
      text-align: center;
      margin-bottom: var(--spacing-2xl);
      color: var(--primary-color);
      font-family: 'Poppins', sans-serif;
    }

    .indicators-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-xl);
    }

    .indicators-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .indicator-item {
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    .indicator-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .indicator-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .indicator-name {
      font-weight: 600;
      color: var(--text-primary);
    }

    .indicator-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: var(--spacing-sm);
      font-family: 'Poppins', sans-serif;
    }

    .indicator-unit {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-secondary);
      font-family: 'Inter', sans-serif;
    }

    .indicator-description {
      font-size: 0.9375rem;
      color: var(--text-secondary);
      margin: 0;
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
    }

    .trend {
      font-size: 1.5rem;
      font-weight: 600;
    }

    .trend-up {
      color: var(--primary-lighter);
    }

    .trend-down {
      color: var(--error-color);
    }

    .trend-stable {
      color: var(--secondary-color);
    }

    .features-section h2 {
      text-align: center;
      margin-bottom: var(--spacing-2xl);
      color: var(--primary-color);
      font-family: 'Poppins', sans-serif;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--spacing-xl);
    }

    .features-grid app-card {
      text-align: center;
    }

    .features-grid .btn {
      margin-top: var(--spacing-md);
    }

    @media (max-width: 768px) {
      .hero {
        padding: var(--spacing-2xl) 0;
      }

      .hero-content h1 {
        font-size: 2.25rem;
      }

      .hero-subtitle {
        font-size: 1.375rem;
      }

      .hero-description {
        font-size: 1.125rem;
      }

      .indicators-grid,
      .features-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-lg);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  indicators$!: Observable<IndicatorGroup[]>;
  
  trackByGroup = TrackByUtil.index;
  trackById = TrackByUtil.id;

  constructor(private indicatorService: IndicatorService) {}

  ngOnInit(): void {
    this.indicators$ = this.indicatorService.getIndicators();
  }

  getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
    const icons = {
      up: '↑',
      down: '↓',
      stable: '→'
    };
    return icons[trend];
  }
}

