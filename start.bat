@echo off
REM Script de inicio para FONAVE Web (Windows Batch)
REM Asegura que el servidor se inicie desde el directorio correcto

cd /d "%~dp0"

echo ========================================
echo   Iniciando FONAVE Web Application
echo ========================================
echo.
echo Directorio: %CD%
echo.

REM Verificar que package.json existe
if not exist "package.json" (
    echo ERROR: No se encontro package.json en el directorio actual.
    echo Por favor, ejecuta este script desde el directorio raiz del proyecto.
    pause
    exit /b 1
)

REM Verificar que node_modules existe
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo ERROR: Fallo la instalacion de dependencias.
        pause
        exit /b 1
    )
)

echo Iniciando servidor de desarrollo...
echo La aplicacion estara disponible en: http://localhost:4200
echo.

call npm start

pause

