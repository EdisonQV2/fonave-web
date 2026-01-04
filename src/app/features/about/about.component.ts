import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <section class="about-hero section">
      <div class="container">
        <h1>Sobre FONAVE</h1>
        <p class="lead">
          Fondo de Ahorro Familiar comprometido con el crecimiento y bienestar de las familias.
        </p>
      </div>
    </section>

    <section class="about-content section">
      <div class="container">
        <div class="about-grid">
          <app-card title="Nuestra Misión">
            <p>
              Promover el ahorro familiar mediante la gestión transparente y responsable de recursos,
              contribuyendo al bienestar económico de nuestros afiliados.
            </p>
          </app-card>

          <app-card title="Nuestra Visión">
            <p>
              Ser el fondo de ahorro familiar de referencia, reconocido por nuestra transparencia,
              solidez financiera y compromiso con el crecimiento de las familias.
            </p>
          </app-card>

          <app-card title="Nuestros Valores">
            <ul class="values-list">
              <li><strong>Transparencia:</strong> Información clara y accesible</li>
              <li><strong>Integridad:</strong> Actuamos con honestidad y ética</li>
              <li><strong>Responsabilidad:</strong> Gestión prudente de recursos</li>
              <li><strong>Compromiso:</strong> Con el bienestar de las familias</li>
            </ul>
          </app-card>
        </div>
      </div>
    </section>

    <section class="history-section section">
      <div class="container">
        <h2>Nuestra Historia</h2>
        <app-card>
          <p>
            FONAVE fue fundado con el propósito de brindar a las familias una herramienta confiable
            para el ahorro y la planificación financiera. Desde nuestros inicios, nos hemos comprometido
            con la transparencia y la gestión responsable de los recursos.
          </p>
          <p>
            A lo largo de los años, hemos crecido junto con nuestras familias afiliadas, manteniendo
            siempre nuestros valores fundamentales y adaptándonos a las necesidades del mercado.
          </p>
        </app-card>
      </div>
    </section>
  `,
  styles: [`
    .about-hero {
      background: var(--background-light);
      text-align: center;
    }

    .about-hero h1 {
      margin-bottom: 1rem;
    }

    .lead {
      font-size: 1.25rem;
      color: var(--text-secondary);
      max-width: 800px;
      margin: 0 auto;
    }

    .about-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .values-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .values-list li {
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border-color);
    }

    .values-list li:last-child {
      border-bottom: none;
    }

    .values-list strong {
      color: var(--primary-color);
      display: block;
      margin-bottom: 0.25rem;
    }

    .history-section h2 {
      text-align: center;
      margin-bottom: 2rem;
    }

    .history-section app-card p {
      margin-bottom: 1rem;
    }

    .history-section app-card p:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      .about-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {}

