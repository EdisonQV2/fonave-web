/**
 * Utilidades para trackBy functions en *ngFor
 * Mejora el rendimiento de Angular usando OnPush
 */

export class TrackByUtil {
  static id<T extends { id: string | number }>(index: number, item: T): string | number {
    return item.id;
  }

  static index(index: number): number {
    return index;
  }

  static property<T>(property: keyof T) {
    return (index: number, item: T) => {
      return item[property];
    };
  }
}

