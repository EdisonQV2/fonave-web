# FONAVE - Fondo de Ahorro Familiar

Aplicación web pública institucional para FONAVE.

## Arquitectura

Este proyecto está construido con Angular 17+ siguiendo principios de Clean Architecture y arquitectura modular:

- **Core**: Funcionalidades centrales (layout, servicios base, modelos, configuración)
- **Shared**: Componentes, pipes y utilidades reutilizables
- **Features**: Módulos de funcionalidad independientes con lazy loading

## Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm start

# Build de producción
npm run build
```

## Estructura del Proyecto

```
src/app
├── core
│   ├── layout
│   ├── services
│   ├── models
│   └── config
├── shared
│   ├── components
│   ├── pipes
│   └── utils
├── features
│   ├── home
│   ├── about
│   ├── transparency
│   ├── policies
│   └── contact
└── app.routes.ts
```

