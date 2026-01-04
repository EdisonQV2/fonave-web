import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Policy, PolicyCategory } from '../models/policy.model';

/**
 * Servicio para gestionar políticas y documentos
 * Preparado para futura integración con API
 */
@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  
  /**
   * Obtiene todas las políticas agrupadas por categoría
   */
  getPolicies(): Observable<PolicyCategory[]> {
    const policies: PolicyCategory[] = [
      {
        id: 'regulation',
        name: 'Reglamentos',
        description: 'Documentos normativos del fondo',
        policies: [
          {
            id: '1',
            title: 'Reglamento Interno',
            description: 'Reglamento que rige el funcionamiento del fondo',
            category: 'regulation',
            effectiveDate: new Date('2024-01-01')
          }
        ]
      },
      {
        id: 'procedure',
        name: 'Procedimientos',
        description: 'Procedimientos operativos',
        policies: [
          {
            id: '2',
            title: 'Procedimiento de Afiliación',
            description: 'Pasos para afiliarse al fondo',
            category: 'procedure',
            effectiveDate: new Date('2024-01-01')
          }
        ]
      }
    ];

    return of(policies);
  }

  /**
   * Obtiene una política específica por ID
   */
  getPolicyById(id: string): Observable<Policy | null> {
    // Placeholder para futura implementación con API
    return of(null);
  }
}

