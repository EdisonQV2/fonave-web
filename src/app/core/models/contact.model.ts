/**
 * Modelo para información de contacto
 */
export interface ContactInfo {
  type: 'email' | 'phone' | 'address' | 'social';
  label: string;
  value: string;
  icon?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

