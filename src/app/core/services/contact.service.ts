import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContactInfo, ContactForm } from '../models/contact.model';

/**
 * Servicio para gestionar información de contacto
 * Preparado para futura integración con API
 */
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  /**
   * Obtiene la información de contacto disponible
   */
  getContactInfo(): Observable<ContactInfo[]> {
    const contactInfo: ContactInfo[] = [
      {
        type: 'email',
        label: 'Correo Electrónico',
        value: 'contacto@fonave.com',
        icon: 'mail'
      },
      {
        type: 'phone',
        label: 'Teléfono',
        value: '+52 (55) 1234-5678',
        icon: 'phone'
      },
      {
        type: 'address',
        label: 'Dirección',
        value: 'Ciudad de México, México',
        icon: 'location'
      }
    ];

    return of(contactInfo);
  }

  /**
   * Envía un formulario de contacto
   * En el futuro, esto enviará a una API
   */
  submitContactForm(form: ContactForm): Observable<{ success: boolean; message: string }> {
    // Simulación de envío
    console.log('Formulario de contacto:', form);
    
    // En producción, aquí se haría una llamada HTTP
    return of({
      success: true,
      message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.'
    });
  }
}

