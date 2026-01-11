# FONAVE - Fondo de Ahorro Familiar

Aplicación web pública institucional para FONAVE.

## Arquitectura

Este proyecto está construido con Angular 17+ siguiendo principios de Clean Architecture y arquitectura modular:

- **Core**: Funcionalidades centrales (layout, servicios base, modelos, configuración)
- **Shared**: Componentes, pipes y utilidades reutilizables
- **Features**: Módulos de funcionalidad independientes con lazy loading

## Desarrollo

### Requisitos Previos
- Node.js 18+ 
- npm 9+

### Instalación

1. **Navega al directorio del proyecto:**
   ```powershell
   cd "D:\Fondo Familiar\Site\fonave-web"
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

### Iniciar la Aplicación

**Opción 1: Usando el script de inicio (Recomendado)**
```powershell
# Windows PowerShell
.\start.ps1

# O Windows CMD
start.bat
```

**Opción 2: Usando npm directamente**
```bash
# Asegúrate de estar en el directorio correcto primero
cd "D:\Fondo Familiar\Site\fonave-web"
npm start
```

**⚠️ IMPORTANTE:** Siempre ejecuta los comandos desde el directorio `fonave-web`, no desde el directorio padre `Site`.

### Build de Producción

```bash
npm run build
```

### Solución de Problemas

Si encuentras el error `ENOENT: no such file or directory, open 'package.json'`:
1. Verifica que estás en el directorio correcto: `D:\Fondo Familiar\Site\fonave-web`
2. Usa el script `start.ps1` o `start.bat` que automáticamente navega al directorio correcto
3. Verifica que `package.json` existe en el directorio actual

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

