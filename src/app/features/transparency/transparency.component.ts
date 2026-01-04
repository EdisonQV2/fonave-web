import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IndicatorGroup } from '../../core/models/indicator.model';
import { IndicatorService } from '../../core/services/indicator.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { TrackByUtil } from '../../shared/utils/track-by.util';

@Component({
  selector: 'app-transparency',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    LoadingComponent,
    DateFormatPipe
  ],
  template: `
    <section class="transparency-hero section">
      <div class="container">
        <h1>Transparencia</h1>
        <p class="lead">
          Creemos en la transparencia como base de la confianza. Aquí encontrarás información
          actualizada sobre nuestros indicadores y operaciones.
        </p>
      </div>
    </section>

    <section class="indicators-section section">
      <div class="container">
        <h2>Indicadores Financieros</h2>
        <div *ngIf="indicators$ | async as indicators; else loading">
          <div class="indicators-grid">
            <app-card
              *ngFor="let group of indicators; trackBy: trackByGroup"
              [title]="group.title">
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
                  <p class="indicator-update">
                    Última actualización: {{ indicator.lastUpdate | dateFormat: 'long' }}
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

    <section class="reports-section section">
      <div class="container">
        <h2>Informes y Reportes</h2>
        <div class="reports-grid">
          <app-card title="Reportes Anuales">
            <p>Acceso a nuestros reportes anuales con información detallada sobre el desempeño del fondo.</p>
            <p class="note">* Los reportes estarán disponibles próximamente</p>
          </app-card>
          <app-card title="Estados Financieros">
            <p>Estados financieros auditados y certificados por autoridades competentes.</p>
            <p class="note">* Los estados financieros estarán disponibles próximamente</p>
          </app-card>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .transparency-hero {
      background: linear-gradient(135deg, var(--background-light) 0%, var(--background-warm) 100%);
      text-align: center;
      padding: var(--spacing-3xl) 0;
    }

    .transparency-hero h1 {
      margin-bottom: var(--spacing-md);
      color: var(--primary-color);
      font-family: 'Poppins', sans-serif;
    }

    .lead {
      font-size: 1.25rem;
      color: var(--text-secondary);
      max-width: 800px;
      margin: 0 auto;
      font-family: 'Inter', sans-serif;
      line-height: 1.7;
    }

    .indicators-section {
      background: var(--background);
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
      margin: 0 0 0.5rem 0;
    }

    .indicator-update {
      font-size: 0.75rem;
      color: var(--text-secondary);
      font-style: italic;
      margin: 0;
    }

    .trend {
      font-size: 1.25rem;
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

    .reports-section {
      background: var(--background-light);
    }

    .reports-section h2 {
      text-align: center;
      margin-bottom: 3rem;
    }

    .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .note {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-style: italic;
      margin-top: 1rem;
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      .indicators-grid,
      .reports-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransparencyComponent implements OnInit {
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

