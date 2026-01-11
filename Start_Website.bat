@echo off
title iPhone 17 Launcher
echo ==========================================
echo   Starting iPhone 17 Interactive Experience
echo ==========================================

cd /d "%~dp0"

echo [1/3] Checking dependencies...
if not exist node_modules (
    echo Node modules not found. Installing...
    call npm install
)

echo [2/3] Starting Local Server...
:: Start the server in a new minimized window
start "iPhone Server" /min cmd /c "npm run dev"

echo [3/3] Waiting for server to launch...
:: Wait 4 seconds to ensure server is ready
timeout /t 4 /nobreak >nul

echo Opening Website...
start "" "http://localhost:3000"

echo.
echo ==========================================
echo   Success! Website should be open.
echo   You can close this window now.
echo ==========================================
pause
