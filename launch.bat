@echo off
title SME CrowdFund VN - Production Launcher
color 0A

echo.
echo ============================================
echo    SME CrowdFund VN - Production Ready
echo ============================================
echo.

echo [1] Start Development Servers
echo [2] Build for Production  
echo [3] Health Check
echo [4] View Documentation
echo [5] Exit
echo.

set /p choice="Select option (1-5): "

if %choice%==1 goto dev
if %choice%==2 goto build
if %choice%==3 goto health
if %choice%==4 goto docs
if %choice%==5 goto exit

:dev
echo.
echo Starting Development Servers...
echo Frontend: http://localhost:3002
echo Backend: http://localhost:5000
echo.
start cmd /k "cd frontend && npm run dev"
start cmd /k "cd backend && npx ts-node src/simple-server.ts"
echo Both servers started in new windows
pause
goto menu

:build
echo.
echo Building for Production...
cd frontend
call npm run build
cd ../backend  
call npm run build
echo Build complete!
pause
goto menu

:health
echo.
echo Running Health Check...
powershell -ExecutionPolicy Bypass -File "scripts/health-check.ps1"
pause
goto menu

:docs
echo.
echo Opening Documentation...
start DEPLOYMENT.md
start README.md
pause
goto menu

:exit
echo.
echo Thank you for using SME CrowdFund VN!
echo Visit: https://your-domain.com (when deployed)
echo.
timeout /t 3
exit

:menu
cls
goto start
