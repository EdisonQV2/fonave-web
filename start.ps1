# Script de inicio para FONAVE Web
# Asegura que el servidor se inicie desde el directorio correcto

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Iniciando FONAVE Web Application" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Directorio: $scriptPath" -ForegroundColor Cyan
Write-Host ""

# Verificar que package.json existe
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: No se encontró package.json en el directorio actual." -ForegroundColor Red
    Write-Host "Por favor, ejecuta este script desde el directorio raíz del proyecto." -ForegroundColor Red
    exit 1
}

# Verificar que node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Falló la instalación de dependencias." -ForegroundColor Red
        exit 1
    }
}

Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Green
Write-Host "La aplicación estará disponible en: http://localhost:4200" -ForegroundColor Cyan
Write-Host ""

npm start

