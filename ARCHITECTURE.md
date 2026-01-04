# Arquitectura del Proyecto FONAVE

## Estructura de Carpetas

```
src/app
├── core/                    # Funcionalidades centrales
│   ├── layout/             # Componentes de layout (header, footer, main-layout)
│   ├── services/           # Servicios base (indicator, contact, policy)
│   ├── models/             # Modelos e interfaces TypeScript
│   └── config/             # Configuración global de la aplicación
│
├── shared/                  # Recursos compartidos
│   ├── components/         # Componentes reutilizables (card, loading)
│   ├── pipes/              # Pipes personalizados (currency, date)
│   └── utils/              # Utilidades (trackBy, helpers)
│
├── features/                # Módulos de funcionalidad
│   ├── home/               # Página principal
│   ├── about/              # Sobre nosotros
│   ├── transparency/       # Transparencia e indicadores
│   ├── policies/           # Políticas y documentos
│   └── contact/            # Formulario de contacto
│
└── app.routes.ts           # Configuración de rutas con lazy loading
```

## Principios de Arquitectura

### 1. Clean Architecture / Modular
- Separación clara de responsabilidades
- Core: Funcionalidades esenciales y compartidas
- Shared: Recursos reutilizables
- Features: Módulos independientes y desacoplados

### 2. Standalone Components
- Todos los componentes son standalone (Angular 17+)
- No hay módulos NgModule
- Imports explícitos en cada componente

### 3. Lazy Loading
- Cada feature se carga bajo demanda
- Rutas configuradas con `loadComponent`
- Mejora el rendimiento inicial

### 4. OnPush Change Detection
- Componentes usan `ChangeDetectionStrategy.OnPush` cuando es posible
- Mejora el rendimiento
- Excepción: Componentes con formularios reactivos

### 5. Tipado Fuerte
- TypeScript strict mode habilitado
- Interfaces y modelos bien definidos
- Sin `any` innecesarios

### 6. TrackBy Functions
- Utilidades para `*ngFor` con `trackBy`
- Mejora el rendimiento de listas grandes

## Servicios

Los servicios están preparados para escalar:

- **IndicatorService**: Gestiona indicadores financieros
- **ContactService**: Maneja información y formularios de contacto
- **PolicyService**: Gestiona políticas y documentos

Actualmente usan datos mock, pero están estructurados para integrarse fácilmente con una API REST.

## Preparado para Escalar

### Futuras Integraciones

1. **API REST**
   - Los servicios ya tienen la estructura para HTTP calls
   - Solo necesitan inyectar `HttpClient` y cambiar `of()` por `http.get()`

2. **Autenticación**
   - Estructura lista para agregar guards de rutas
   - Servicios de autenticación pueden ir en `core/services`
   - Interceptors HTTP preparados para tokens

3. **Portal Privado**
   - Nuevas features pueden agregarse en `features/`
   - Guards de autenticación protegerán rutas privadas
   - Layout diferente puede crearse en `core/layout/`

4. **Estado Global**
   - Preparado para integrar NgRx o Signals
   - Servicios pueden evolucionar a stores

## Buenas Prácticas Implementadas

✅ Standalone components
✅ Lazy loading por secciones
✅ OnPush change detection (donde aplica)
✅ TrackBy functions
✅ Tipado fuerte
✅ Separación de responsabilidades
✅ Código preparado para escalar
✅ Arquitectura modular
✅ Services con estructura para API
✅ Models e interfaces bien definidos

## Comandos Útiles

```bash
# Desarrollo
npm start

# Build producción
npm run build

# Linting
npm run lint

# Tests (cuando se configuren)
npm test
```

