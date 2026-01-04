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
          <h1>Bienvenido a FONAVE</h1>
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
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      color: white;
      padding: 6rem 0;
      text-align: center;
    }

    .hero-content h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: white;
    }

    .hero-subtitle {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      opacity: 0.9;
    }

    .hero-description {
      font-size: 1.125rem;
      max-width: 600px;
      margin: 0 auto 2rem;
      opacity: 0.9;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .indicators-section {
      background: var(--background-light);
    }

    .indicators-section h2 {
      text-align: center;
      margin-bottom: 3rem;
    }

    .indicators-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
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
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .indicator-unit {
      font-size: 1rem;
      font-weight: 400;
      color: var(--text-secondary);
    }

    .indicator-description {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .trend {
      font-size: 1.25rem;
    }

    .trend-up {
      color: var(--secondary-color);
    }

    .trend-down {
      color: #ef4444;
    }

    .trend-stable {
      color: var(--text-secondary);
    }

    .features-section h2 {
      text-align: center;
      margin-bottom: 3rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .features-grid app-card {
      text-align: center;
    }

    .features-grid .btn {
      margin-top: 1rem;
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1.25rem;
      }

      .indicators-grid,
      .features-grid {
        grid-template-columns: 1fr;
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

