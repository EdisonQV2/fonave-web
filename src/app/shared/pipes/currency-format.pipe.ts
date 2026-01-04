import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | string, currency: string = 'MXN'): string {
    if (typeof value === 'string') {
      return value; // Si ya viene formateado, retornar tal cual
    }

    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency
    }).format(value);
  }
}

