@echo off
title SME CROWDFUND VN - SAFE SERVER STARTUP
echo ========================================
echo   SME CROWDFUND VN - SAFE STARTUP
echo ========================================
echo.

echo [1/3] Stopping existing Node processes...
taskkill /f /im node.exe >nul 2>&1

echo [2/3] Changing to frontend directory...
cd /d "d:\APP xuanloc\Nền tảng gọi vốn SME\sme-crowdfund-vn\frontend"

echo [3/3] Starting server in DEDICATED window...
echo.
echo This prevents tunnel conflicts!
echo.

REM Start server in dedicated window to prevent conflicts
start "SME Server (Port 3000)" cmd /k "npm run serve"

echo ✅ Server starting in separate window!
echo.
echo ========================================
echo   ACCESS INFORMATION
echo ========================================
echo Local:   http://localhost:3000
echo Network: http://192.168.1.3:3000
echo.
echo ========================================
echo   FOR PUBLIC ACCESS
echo ========================================
echo.
echo Open NEW Command Prompt and run:
echo   npx localtunnel --port 3000
echo.
echo ⚠️  IMPORTANT: Use separate windows!
echo    Server = One window
echo    Tunnel = Another window
echo.
echo Press any key to continue...
pause >nul
echo Local Access:    http://localhost:3000
echo Network Access:  http://192.168.1.3:3000
echo.
echo Note: If network access doesn't work, run as Administrator:
echo   New-NetFirewallRule -DisplayName "SME CrowdFund" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
echo.
echo Starting server...
echo =====================================

npm run serve
