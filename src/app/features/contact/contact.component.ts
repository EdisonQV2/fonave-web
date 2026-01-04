import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContactInfo, ContactForm } from '../../core/models/contact.model';
import { ContactService } from '../../core/services/contact.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { TrackByUtil } from '../../shared/utils/track-by.util';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    LoadingComponent
  ],
  template: `
    <section class="contact-hero section">
      <div class="container">
        <h1>Contacto</h1>
        <p class="lead">
          Estamos aquí para ayudarte. Contáctanos a través de cualquiera de nuestros canales
          o envíanos un mensaje.
        </p>
      </div>
    </section>

    <section class="contact-content section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>Información de Contacto</h2>
            <div *ngIf="contactInfo$ | async as contactInfo">
              <div
                *ngFor="let info of contactInfo; trackBy: trackByIndex"
                class="contact-item">
                <div class="contact-icon">{{ getIcon(info.type) }}</div>
                <div class="contact-details">
                  <h4>{{ info.label }}</h4>
                  <p>{{ info.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form-section">
            <app-card title="Envíanos un Mensaje">
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                  <label for="name">Nombre completo *</label>
                  <input
                    type="text"
                    id="name"
                    formControlName="name"
                    class="form-control"
                    [class.error]="isFieldInvalid('name')">
                  <span *ngIf="isFieldInvalid('name')" class="error-message">
                    El nombre es requerido
                  </span>
                </div>

                <div class="form-group">
                  <label for="email">Correo electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    formControlName="email"
                    class="form-control"
                    [class.error]="isFieldInvalid('email')">
                  <span *ngIf="isFieldInvalid('email')" class="error-message">
                    Ingresa un correo válido
                  </span>
                </div>

                <div class="form-group">
                  <label for="phone">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    formControlName="phone"
                    class="form-control">
                </div>

                <div class="form-group">
                  <label for="subject">Asunto *</label>
                  <input
                    type="text"
                    id="subject"
                    formControlName="subject"
                    class="form-control"
                    [class.error]="isFieldInvalid('subject')">
                  <span *ngIf="isFieldInvalid('subject')" class="error-message">
                    El asunto es requerido
                  </span>
                </div>

                <div class="form-group">
                  <label for="message">Mensaje *</label>
                  <textarea
                    id="message"
                    formControlName="message"
                    rows="5"
                    class="form-control"
                    [class.error]="isFieldInvalid('message')"></textarea>
                  <span *ngIf="isFieldInvalid('message')" class="error-message">
                    El mensaje es requerido
                  </span>
                </div>

                <div *ngIf="submitMessage" class="submit-message" [class.success]="submitSuccess">
                  {{ submitMessage }}
                </div>

                <button
                  type="submit"
                  class="btn btn-primary"
                  [disabled]="contactForm.invalid || isSubmitting">
                  <span *ngIf="!isSubmitting">Enviar Mensaje</span>
                  <span *ngIf="isSubmitting">Enviando...</span>
                </button>
              </form>
            </app-card>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-hero {
      background: linear-gradient(135deg, var(--background-light) 0%, var(--background-warm) 100%);
      text-align: center;
      padding: var(--spacing-3xl) 0;
    }

    .contact-hero h1 {
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

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 3rem;
    }

    .contact-info h2 {
      margin-bottom: 2rem;
    }

    .contact-item {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--background-light);
      border-radius: 0.5rem;
    }

    .contact-icon {
      font-size: 1.75rem;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
      color: white;
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: var(--shadow-sm);
    }

    .contact-details h4 {
      margin: 0 0 0.5rem 0;
      color: var(--text-primary);
    }

    .contact-details p {
      margin: 0;
      color: var(--text-secondary);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 0.375rem;
      font-size: 1rem;
      transition: border-color 0.2s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
    }

    .form-control.error {
      border-color: var(--error-color);
    }

    .error-message {
      display: block;
      color: var(--error-color);
      font-size: 0.875rem;
      margin-top: var(--spacing-xs);
      font-family: 'Inter', sans-serif;
    }

    .submit-message {
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-md);
      background: rgba(245, 158, 11, 0.1);
      color: #92400e;
      border: 1px solid rgba(245, 158, 11, 0.3);
      font-family: 'Inter', sans-serif;
    }

    .submit-message.success {
      background: var(--success-light);
      color: var(--success-color);
      border-color: var(--primary-lighter);
    }

    button[disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `],
  // OnPush no se usa aquí porque los formularios reactivos necesitan detección de cambios por defecto
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  contactInfo$!: Observable<ContactInfo[]>;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;
  
  trackByIndex = TrackByUtil.index;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.contactInfo$ = this.contactService.getContactInfo();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      const formValue: ContactForm = this.contactForm.value;

      this.contactService.submitContactForm(formValue).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submitSuccess = response.success;
          this.submitMessage = response.message;
          if (response.success) {
            this.contactForm.reset();
          }
        },
        error: () => {
          this.isSubmitting = false;
          this.submitSuccess = false;
          this.submitMessage = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  getIcon(type: string): string {
    const icons: Record<string, string> = {
      email: '✉',
      phone: '📞',
      address: '📍',
      social: '🔗'
    };
    return icons[type] || '•';
  }
}

