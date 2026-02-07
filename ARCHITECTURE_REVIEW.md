# Revisión de Arquitectura — FONAVE Web

**Revisor:** Senior Software Architect  
**Fecha:** Enero 2025  
**Alcance:** Proyecto Angular 17+ (fonave-web)

---

## 1. Resumen Ejecutivo

El proyecto aplica una **arquitectura modular** alineada con Clean Architecture y buenas prácticas de Angular 17+. La separación **core / shared / features**, el uso de **standalone components**, **lazy loading** y **OnPush** donde aplica están bien planteados. La base es sólida para crecer hacia API, autenticación y portal privado. Se identifican mejoras concretas en consistencia, testing, seguridad y preparación para producción.

**Veredicto:** ✅ **Arquitectura aprobada con recomendaciones de mejora.**

---

## 2. Fortalezas

### 2.1 Estructura y responsabilidades

- **Core:** Layout, servicios, modelos y config están bien agrupados. `APP_CONFIG` centralizado facilita cambios de entorno.
- **Shared:** Componentes reutilizables (`Card`, `Loading`), pipes (`currencyFormat`, `dateFormat`) y `TrackByUtil` evitan duplicación y favorecen consistencia.
- **Features:** Cada feature es un bounded context claro (home, about, transparency, policies, contact) con lazy loading.

### 2.2 Stack y patrones

- **Standalone components** en todo el proyecto, sin `NgModule` innecesarios.
- **Lazy loading** por ruta con `loadComponent()`.
- **ChangeDetectionStrategy.OnPush** en home, transparency y policies; Contact usa Default por formularios reactivos (decisión documentada y coherente).
- **TrackBy** consistente en listas (`TrackByUtil.id`, `TrackByUtil.index`).
- **TypeScript strict** y `strictTemplates` habilitados; modelos e interfaces bien tipados.

### 2.3 UX y diseño

- **Sistema de diseño** en `styles.css`: variables CSS (colores, espaciado, sombras, radios), tipografía (Poppins/Inter), botones y formularios coherentes.
- **Responsive:** breakpoints y menú hamburguesa en header.
- **Accesibilidad:** `aria-expanded`, `aria-label` en el menú; estructura semántica (header, main, footer, section).

### 2.4 Servicios y escalabilidad

- Servicios devuelven `Observable<T>`, preparados para sustituir `of()` por `HttpClient` cuando exista API.
- README de servicios con guía de integración HTTP e interceptors.
- Modelos de dominio claros (`Indicator`, `ContactForm`, `Policy`, etc.).

---

## 3. Áreas de Mejora

### 3.1 Rutas y navegación

| Aspecto | Estado | Recomendación |
|--------|--------|----------------|
| Wildcard `**` → `''` | OK | Considerar página 404 dedicada en lugar de redirigir siempre a home. |
| Rutas sin guards | OK para sitio público | Al añadir área privada, usar `CanActivateFn` (functional guards). |
| Rutas sin títulos | Mejorable | Usar `Title` strategy o `resolve`/data para SEO y título por página. |

**Sugerencia:** Añadir `path: '404'` con un componente `NotFoundComponent` y redirigir `**` → `'404'` (o mostrar 404 in-place).

### 3.2 HTTP y configuración

- **HttpClient no registrado:** En `main.ts` no está `provideHttpClient()`. Correcto mientras solo haya mocks; al conectar API hay que añadirlo (ya documentado en `core/services/README.md`).
- **API base:** `APP_CONFIG.apiUrl` está vacío. Recomendación: usar entornos (`environment.ts` o `APP_CONFIG` inyectado desde build) para `apiUrl` y otros valores por entorno.
- **Manejo de errores:** Los servicios no exponen flujos de error tipados. Al pasar a HTTP, definir contratos de error (ej. `ApiError`) y un interceptor de errores global.

### 3.3 Seguridad y buenas prácticas

- **ContactService.submitContactForm:** Hay `console.log('Formulario de contacto:', form)` — eliminar en producción para no exponer datos.
- **Sanitización:** Si en el futuro se muestra HTML dinámico, usar `DomSanitizer` y políticas restrictivas.
- **Headers y CORS:** Cuando exista API, documentar necesidad de configuración CORS y, si aplica, headers de autenticación (Bearer, etc.).

### 3.4 Testing

- **Sin tests:** No hay specs (Jasmine/Karma) ni configuración de testing en el flujo actual. El script `npm test` existe pero sin cobertura real.
- **Recomendación:** Priorizar tests unitarios para servicios (Indicator, Contact, Policy) y al menos un test de integración/router para el flujo principal. A medio plazo, valorar Jest o mantener Karma según estándares del equipo.

### 3.5 Consistencia de código

- **Home:** Importa `CurrencyFormatPipe` pero en el template no se usa (los valores de indicadores se muestran con `{{ indicator.value }}`). O usar el pipe donde corresponda o quitar el import.
- **Duplicación de lógica:** `getTrendIcon()` está repetido en Home y Transparency; conviene extraer a un util o pipe (ej. `TrendIconPipe`) en `shared`.
- **Footer:** Usa `config = APP_CONFIG` directamente. Para testear y para futuros entornos, considerar inyección de un token de configuración (ej. `APP_CONFIG`) en lugar de import estático.

### 3.6 Performance y bundles

- **Budgets:** `angular.json` define 500KB warning / 1MB error para initial. Adecuado; revisar cuando se añadan librerías pesadas.
- **Imports:** No se detectan imports de librerías completas (ej. `rxjs`); uso de `async` y Observables correcto.
- **Lazy loading:** Todas las features lazy; solo Core y Shared en bundle inicial. ✅

### 3.7 Documentación y convenciones

- **ARCHITECTURE.md y PROJECT_STRUCTURE.md:** Buenos y alineados con la implementación.
- **README:** Instrucciones de instalación y ejecución claras; la ruta `D:\Fondo Familiar\Site\fonave-web` es específica de un entorno — considerar rutas relativas o “desde la raíz del proyecto”.
- **Comentarios en código:** Servicios documentados con comentarios útiles; en componentes complejos futuros, mantener el mismo nivel.

---

## 4. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Integración API sin manejo de errores | Alto | Interceptor HTTP, mensajes de usuario y logging; contratos de error. |
| Sin tests antes de ampliar funcionalidad | Medio | Introducir tests para servicios y rutas críticas antes de nuevas features. |
| Configuración fija (apiUrl, contact) | Medio | Entornos (environment) o config inyectada por build. |
| `console.log` con datos de formulario | Bajo | Eliminar en producción; usar logger condicional si se necesita en desarrollo. |

---

## 5. Plan de Acción Sugerido

### Corto plazo (1–2 sprints)

1. Corregir texto en Home: "Bienvenido a FONAVE" (typo "JP." ya corregido en esta revisión).
2. Eliminar `console.log` en `ContactService.submitContactForm`.
3. Quitar import no usado de `CurrencyFormatPipe` en Home o usarlo donde corresponda.
4. Extraer `getTrendIcon()` a `shared` (pipe o util) y reutilizar en Home y Transparency.
5. Añadir página 404 y ruta `**` → 404.

### Medio plazo (antes de integración API)

6. Registrar `provideHttpClient()` en `main.ts` cuando se vaya a consumir API.
7. Introducir `environment.ts` (o equivalente) para `apiUrl` y config por entorno.
8. Tests unitarios para Indicator, Contact y Policy services (mocks de HTTP).
9. Al menos un test de rutas (lazy load de una feature).

### Largo plazo (escalabilidad)

10. Guards funcionales para rutas privadas cuando existan.
11. Interceptor HTTP para errores y, si aplica, token de autenticación.
12. Estrategia de títulos de página (Title, meta) para SEO.
13. Revisar si el estado de la app requiere Signals o un store (NgRx, etc.) cuando crezca la complejidad.

---

## 6. Conclusión

El proyecto FONAVE Web tiene una **base arquitectónica sólida**: modular, standalone, lazy loading, OnPush y tipado estricto. La documentación y el diseño están cuidados. Las mejoras propuestas son sobre todo de **consistencia** (eliminar código muerto, reutilizar lógica), **preparación para producción** (sin logs sensibles, 404, entornos) y **testing** antes de escalar. Con los ajustes de corto y medio plazo, la aplicación queda bien preparada para la integración con API y la evolución hacia un posible portal con área privada.

---

*Documento generado en el marco de una revisión de arquitectura por un Senior Software Architect.*
