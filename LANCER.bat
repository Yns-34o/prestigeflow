@echo off
title PrestigeFlow - Restaurant Gastronomique
chcp 65001 >nul

echo.
echo  ==============================
echo   PrestigeFlow - Demarrage...
echo  ==============================
echo.

cd /d "%~dp0"

:: Node.js
where node >nul 2>&1
if errorlevel 1 (
    echo  [ERREUR] Node.js est introuvable.
    echo  Installe-le sur https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: Dependances
if not exist "node_modules" (
    echo  Installation des dependances...
    call npm install
    echo.
)

:: Kill any existing node processes on port 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)

:: Lancer le serveur
echo  Serveur en cours de lancement...
echo  Adresse : http://localhost:3000
echo.
echo  Ctrl+C pour arreter
echo.

timeout /t 2 /nobreak >nul
start "" "http://localhost:3000"
call npx next dev -p 3000

pause
