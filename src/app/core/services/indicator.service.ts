import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Indicator, IndicatorGroup } from '../models/indicator.model';

/**
 * Servicio para gestionar indicadores del fondo
 * Preparado para futura integración con API
 */
@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  
  /**
   * Obtiene los indicadores generales del fondo
   * En el futuro, esto se conectará a una API
   */
  getIndicators(): Observable<IndicatorGroup[]> {
    // Datos mock - en producción vendrán de una API
    const indicators: IndicatorGroup[] = [
      {
        title: 'Indicadores Financieros',
        indicators: [
          {
            id: '1',
            name: 'Total de Fondos',
            value: 'COP $100,000,000',
            description: 'Capital total administrado',
            trend: 'up',
            lastUpdate: new Date()
          },
          {
            id: '2',
            name: 'Número de Afiliados',
            value: 24,
            unit: 'afiliados',
            trend: 'up',
            lastUpdate: new Date()
          }
        ]
      },
      {
        title: 'Rendimiento',
        indicators: [
          {
            id: '3',
            name: 'Tasa de Rendimiento Anual',
            value: 9.0,
            unit: '%',
            description: 'Promedio anual',
            trend: 'stable',
            lastUpdate: new Date()
          }
        ]
      }
    ];

    return of(indicators);
  }

  /**
   * Obtiene un indicador específico por ID
   */
  getIndicatorById(id: string): Observable<Indicator | null> {
    // En producción, esto haría una llamada HTTP específica
    // Por ahora retornamos null como placeholder
    return of(null);
  }
}

