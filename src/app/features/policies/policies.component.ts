import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PolicyCategory } from '../../core/models/policy.model';
import { PolicyService } from '../../core/services/policy.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { TrackByUtil } from '../../shared/utils/track-by.util';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    LoadingComponent,
    DateFormatPipe
  ],
  template: `
    <section class="policies-hero section">
      <div class="container">
        <h1>Políticas y Documentos</h1>
        <p class="lead">
          Accede a nuestros reglamentos, procedimientos y documentos normativos que rigen
          el funcionamiento del fondo.
        </p>
      </div>
    </section>

    <section class="policies-content section">
      <div class="container">
        <div *ngIf="policies$ | async as policyCategories; else loading">
          <div
            *ngFor="let category of policyCategories; trackBy: trackById"
            class="policy-category">
            <app-card [title]="category.name">
              <p class="category-description">{{ category.description }}</p>
              <div class="policies-list">
                <div
                  *ngFor="let policy of category.policies; trackBy: trackById"
                  class="policy-item">
                  <h4>{{ policy.title }}</h4>
                  <p>{{ policy.description }}</p>
                  <div class="policy-meta">
                    <span class="policy-date">
                      Vigente desde: {{ policy.effectiveDate | dateFormat: 'long' }}
                    </span>
                    <span *ngIf="policy.lastUpdate" class="policy-update">
                      Última actualización: {{ policy.lastUpdate | dateFormat: 'long' }}
                    </span>
                  </div>
                  <a
                    *ngIf="policy.documentUrl"
                    [href]="policy.documentUrl"
                    target="_blank"
                    class="btn btn-primary btn-sm">
                    Ver documento
                  </a>
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
  `,
  styles: [`
    .policies-hero {
      background: linear-gradient(135deg, var(--background-light) 0%, var(--background-warm) 100%);
      text-align: center;
      padding: var(--spacing-3xl) 0;
    }

    .policies-hero h1 {
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

    .policy-category {
      margin-bottom: 3rem;
    }

    .category-description {
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }

    .policies-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .policy-item {
      padding: var(--spacing-xl);
      background: var(--background-light);
      border-radius: var(--radius-md);
      border-left: 4px solid var(--primary-color);
      transition: all 0.2s ease;
    }

    .policy-item:hover {
      background: var(--background-warm);
      transform: translateX(4px);
      box-shadow: var(--shadow-sm);
    }

    .policy-item h4 {
      margin: 0 0 var(--spacing-sm) 0;
      color: var(--primary-color);
      font-size: 1.125rem;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
    }

    .policy-item p {
      margin: 0 0 1rem 0;
      color: var(--text-secondary);
    }

    .policy-meta {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .policy-meta {
        font-size: 0.75rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoliciesComponent implements OnInit {
  policies$!: Observable<PolicyCategory[]>;
  
  trackById = TrackByUtil.id;

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.policies$ = this.policyService.getPolicies();
  }
}

