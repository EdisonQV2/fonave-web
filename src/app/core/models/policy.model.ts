/**
 * Modelo para políticas y documentos
 */
export interface Policy {
  id: string;
  title: string;
  description: string;
  category: 'regulation' | 'procedure' | 'agreement' | 'other';
  documentUrl?: string;
  effectiveDate: Date;
  lastUpdate?: Date;
}

export interface PolicyCategory {
  id: string;
  name: string;
  description: string;
  policies: Policy[];
}

