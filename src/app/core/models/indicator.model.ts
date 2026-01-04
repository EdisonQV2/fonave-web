/**
 * Modelo para indicadores generales del fondo
 */
export interface Indicator {
  id: string;
  name: string;
  value: string | number;
  unit?: string;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
  lastUpdate: Date;
}

export interface IndicatorGroup {
  title: string;
  indicators: Indicator[];
}

