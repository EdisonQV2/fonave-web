# Servicios - Guía de Integración con API

Los servicios actuales están preparados para integrarse con una API REST. Aquí se muestra cómo hacerlo:

## Ejemplo: IndicatorService con HTTP

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Indicator, IndicatorGroup } from '../models/indicator.model';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  private apiUrl = 'https://api.fonave.com/v1'; // Configurar en app.config.ts

  constructor(private http: HttpClient) {}

  getIndicators(): Observable<IndicatorGroup[]> {
    return this.http.get<IndicatorGroup[]>(`${this.apiUrl}/indicators`);
  }

  getIndicatorById(id: string): Observable<Indicator | null> {
    return this.http.get<Indicator>(`${this.apiUrl}/indicators/${id}`).pipe(
      map(indicator => indicator || null)
    );
  }
}
```

## Configuración Necesaria

1. **Agregar HttpClientModule en main.ts:**
```typescript
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient() // Agregar esto
  ]
});
```

2. **Actualizar app.config.ts con la URL de la API:**
```typescript
export const APP_CONFIG = {
  // ...
  apiUrl: 'https://api.fonave.com/v1'
};
```

3. **Manejo de Errores:**
```typescript
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

getIndicators(): Observable<IndicatorGroup[]> {
  return this.http.get<IndicatorGroup[]>(`${this.apiUrl}/indicators`).pipe(
    catchError(error => {
      console.error('Error fetching indicators:', error);
      return throwError(() => error);
    })
  );
}
```

## Interceptors para Autenticación

Cuando se implemente autenticación, crear un interceptor:

```typescript
// core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req);
};
```

Registrar en `main.ts`:
```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';

provideHttpClient(
  withInterceptors([authInterceptor])
)
```

