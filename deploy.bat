@echo off
title SME CrowdFund VN - Production Deployment
color 0A

echo.
echo ==========================================
echo   SME CrowdFund VN - Production Deploy
echo ==========================================
echo.

echo Choose deployment method:
echo.
echo [1] Deploy Frontend to Vercel
echo [2] Deploy Backend to Railway  
echo [3] Deploy Full Stack (Both)
echo [4] Configure Environment Variables
echo [5] View Deployment Guide
echo [6] Exit
echo.

set /p choice="Select option (1-6): "

if %choice%==1 goto frontend
if %choice%==2 goto backend
if %choice%==3 goto fullstack
if %choice%==4 goto envconfig
if %choice%==5 goto guide
if %choice%==6 goto exit

:frontend
echo.
echo ========================================
echo       FRONTEND DEPLOYMENT (VERCEL)
echo ========================================
echo.

echo 🌐 Step 1: Open Vercel in browser
start https://vercel.com

echo.
echo 📋 Step 2: Follow these instructions:
echo.
echo 1. Sign in with GitHub account
echo 2. Click "New Project"
echo 3. Import repository: xuanloc2k4deptrai/sme-crowdfund-vn
echo 4. Framework Preset: Next.js
echo 5. Root Directory: frontend
echo 6. Build Command: npm run build
echo 7. Output Directory: .next
echo.

echo 🔧 Step 3: Set Environment Variables:
echo.
echo NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
echo NEXT_PUBLIC_SITE_URL=https://sme-crowdfund-vn.vercel.app
echo NODE_ENV=production
echo.

echo 🚀 Step 4: Click "Deploy"
echo.
echo ✅ Expected result: https://sme-crowdfund-vn.vercel.app
echo.
pause
goto menu

:backend
echo.
echo ========================================
echo       BACKEND DEPLOYMENT (RAILWAY)
echo ========================================
echo.

echo 🌐 Step 1: Open Railway in browser
start https://railway.app

echo.
echo 📋 Step 2: Follow these instructions:
echo.
echo 1. Sign in with GitHub account
echo 2. Click "New Project"
echo 3. Select "Deploy from GitHub repo"
echo 4. Choose: xuanloc2k4deptrai/sme-crowdfund-vn
echo 5. Root Directory: backend
echo 6. Add PostgreSQL database
echo.

echo 🔧 Step 3: Set Environment Variables:
echo.
echo NODE_ENV=production
echo PORT=3000
echo DATABASE_URL=${{Postgres.DATABASE_URL}}
echo JWT_SECRET=your-super-secure-jwt-secret-here
echo CORS_ORIGIN=https://sme-crowdfund-vn.vercel.app
echo.

echo 🚀 Step 4: Deploy backend
echo.
echo ✅ Expected result: https://your-app.railway.app
echo.
pause
goto menu

:fullstack
echo.
echo ========================================
echo         FULL STACK DEPLOYMENT
echo ========================================
echo.

echo 🎯 Complete deployment process:
echo.
echo 1. 🌐 Opening Vercel for frontend...
start https://vercel.com

timeout /t 3

echo 2. 🌐 Opening Railway for backend...
start https://railway.app

timeout /t 3

echo 3. 📖 Opening deployment guide...
start PRODUCTION-DEPLOYMENT.md

echo.
echo 📋 Follow the complete guide in PRODUCTION-DEPLOYMENT.md
echo.
echo Deployment order:
echo 1. Deploy backend to Railway first
echo 2. Note the Railway URL
echo 3. Deploy frontend to Vercel with Railway URL
echo 4. Update CORS settings in backend
echo.
pause
goto menu

:envconfig
echo.
echo ========================================
echo      ENVIRONMENT CONFIGURATION
echo ========================================
echo.

echo 📁 Frontend Environment (.env.local):
echo.
type nul > frontend\.env.production
echo NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api >> frontend\.env.production
echo NEXT_PUBLIC_SITE_URL=https://sme-crowdfund-vn.vercel.app >> frontend\.env.production
echo NODE_ENV=production >> frontend\.env.production

echo ✅ Created: frontend\.env.production
echo.

echo 📁 Backend Environment (.env.production):
echo.
type nul > backend\.env.production
echo NODE_ENV=production >> backend\.env.production
echo PORT=3000 >> backend\.env.production
echo DATABASE_URL=your-postgresql-connection-string >> backend\.env.production
echo JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters >> backend\.env.production
echo CORS_ORIGIN=https://sme-crowdfund-vn.vercel.app >> backend\.env.production

echo ✅ Created: backend\.env.production
echo.

echo 🔧 Remember to:
echo 1. Update URLs with actual deployment URLs
echo 2. Generate strong JWT secret
echo 3. Copy these to platform dashboards
echo.
pause
goto menu

:guide
echo.
echo 📖 Opening deployment guides...
start PRODUCTION-DEPLOYMENT.md
start DEPLOYMENT.md
start README.md
echo.
echo 📚 All deployment documentation opened
echo.
pause
goto menu

:exit
echo.
echo ========================================
echo        DEPLOYMENT INFORMATION
echo ========================================
echo.
echo 🌐 Repository: https://github.com/xuanloc2k4deptrai/sme-crowdfund-vn
echo 📖 Deployment Guide: PRODUCTION-DEPLOYMENT.md
echo.
echo 🎯 Recommended platforms:
echo   Frontend: Vercel (https://vercel.com)
echo   Backend: Railway (https://railway.app)
echo.
echo 💰 Expected costs:
echo   Free tier: $0-5/month
echo   Production: $25-40/month
echo.
echo 🚀 After deployment:
echo   Frontend: https://sme-crowdfund-vn.vercel.app
echo   Backend: https://your-app.railway.app
echo.
echo 🎉 Good luck with your deployment!
timeout /t 5
exit

:menu
cls
goto start
