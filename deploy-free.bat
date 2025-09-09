@echo off
title SME CrowdFund VN - FREE Deployment
color 0A

echo.
echo ==========================================
echo   SME CrowdFund VN - DEPLOY MIỄN PHÍ
echo ==========================================
echo.
echo 💰 Chi phí: $0 - HOÀN TOÀN MIỄN PHÍ
echo 🎯 Mục đích: Trải nghiệm và demo
echo.

echo Choose free deployment option:
echo.
echo [1] 🌐 Deploy Frontend (Vercel - FREE)
echo [2] 🔧 Deploy Backend (Render - FREE)  
echo [3] 🚀 Deploy Full Stack (Both - FREE)
echo [4] 📖 View Free Deployment Guide
echo [5] 🔧 Setup Free Environment
echo [6] Exit
echo.

set /p choice="Select option (1-6): "

if %choice%==1 goto frontend
if %choice%==2 goto backend
if %choice%==3 goto fullstack
if %choice%==4 goto guide
if %choice%==5 goto setup
if %choice%==6 goto exit

:frontend
echo.
echo ========================================
echo     FRONTEND - VERCEL (100%% MIỄN PHÍ)
echo ========================================
echo.

echo 🌐 Opening Vercel in browser...
start https://vercel.com

echo.
echo 📋 HƯỚNG DẪN DEPLOY MIỄN PHÍ:
echo.
echo 1. ✅ Sign up FREE with GitHub account
echo 2. ✅ Click "New Project" (FREE)
echo 3. ✅ Import: xuanloc2k4deptrai/sme-crowdfund-vn
echo 4. ✅ Framework: Next.js (auto-detected)
echo 5. ✅ Root Directory: frontend
echo 6. ✅ Click "Deploy" - HOÀN TOÀN MIỄN PHÍ
echo.

echo 🔧 Environment Variables (FREE):
echo.
echo NEXT_PUBLIC_API_URL=https://sme-crowdfund-vn.onrender.com/api
echo NEXT_PUBLIC_SITE_URL=https://sme-crowdfund-vn.vercel.app  
echo NODE_ENV=production
echo.

echo ✅ Expected FREE URL: https://sme-crowdfund-vn.vercel.app
echo 💰 Cost: $0/month - FREE FOREVER
echo 📊 Limits: 100GB bandwidth/month (more than enough!)
echo.
pause
goto menu

:backend
echo.
echo ========================================
echo     BACKEND - RENDER (100%% MIỄN PHÍ)
echo ========================================
echo.

echo 🌐 Opening Render in browser...
start https://render.com

echo.
echo 📋 HƯỚNG DẪN DEPLOY MIỄN PHÍ:
echo.
echo 1. ✅ Sign up FREE with GitHub account
echo 2. ✅ New Web Service (FREE)
echo 3. ✅ Connect: xuanloc2k4deptrai/sme-crowdfund-vn
echo 4. ✅ Root Directory: backend
echo 5. ✅ Plan: FREE (QUAN TRỌNG!)
echo 6. ✅ Build: npm install ^&^& npm run build
echo 7. ✅ Start: npm start
echo.

echo 🔧 Environment Variables (FREE):
echo.
echo NODE_ENV=production
echo PORT=10000
echo JWT_SECRET=sme-crowdfund-vn-super-secure-secret-2025
echo CORS_ORIGIN=https://sme-crowdfund-vn.vercel.app
echo.

echo 💾 Add FREE PostgreSQL Database:
echo 1. ✅ New PostgreSQL (FREE)
echo 2. ✅ Plan: FREE (1GB storage)
echo 3. ✅ Copy Database URL
echo 4. ✅ Add to environment: DATABASE_URL
echo.

echo ✅ Expected FREE URL: https://sme-crowdfund-vn.onrender.com
echo 💰 Cost: $0/month - FREE TIER
echo 📊 Limits: 750 hours/month (enough for 24/7!)
echo.
pause
goto menu

:fullstack
echo.
echo ========================================
echo       FULL STACK - HOÀN TOÀN MIỄN PHÍ
echo ========================================
echo.

echo 🎯 Total Cost: $0/month - 100%% FREE
echo.

echo 1. 🌐 Opening Vercel for frontend...
start https://vercel.com
timeout /t 2

echo 2. 🌐 Opening Render for backend...
start https://render.com
timeout /t 2

echo 3. 📖 Opening free deployment guide...
start FREE-DEPLOYMENT.md

echo.
echo 📋 DEPLOYMENT ORDER (MIỄN PHÍ):
echo.
echo 1. ✅ Deploy backend to Render FIRST (FREE)
echo    - Get free PostgreSQL database (1GB)
echo    - Note the free Render URL
echo.
echo 2. ✅ Deploy frontend to Vercel (FREE)  
echo    - Use Render URL in environment
echo    - Get free Vercel URL
echo.
echo 3. ✅ Update backend CORS (FREE)
echo    - Add Vercel URL to CORS_ORIGIN
echo.

echo 💰 EXPECTED COSTS:
echo Frontend (Vercel): $0/month - FREE
echo Backend (Render): $0/month - FREE  
echo Database (Render): $0/month - FREE
echo TOTAL: $0/month - HOÀN TOÀN MIỄN PHÍ!
echo.

echo 🎉 Perfect for testing and demo!
echo.
pause
goto menu

:setup
echo.
echo ========================================
echo      FREE ENVIRONMENT SETUP
echo ========================================
echo.

echo 📁 Creating FREE environment configs...
echo.

echo Creating frontend/.env.production (FREE)...
type nul > frontend\.env.production
echo NEXT_PUBLIC_API_URL=https://sme-crowdfund-vn.onrender.com/api >> frontend\.env.production
echo NEXT_PUBLIC_SITE_URL=https://sme-crowdfund-vn.vercel.app >> frontend\.env.production
echo NODE_ENV=production >> frontend\.env.production

echo Creating backend/.env.production (FREE)...
type nul > backend\.env.production
echo NODE_ENV=production >> backend\.env.production
echo PORT=10000 >> backend\.env.production
echo JWT_SECRET=sme-crowdfund-vn-super-secure-secret-2025 >> backend\.env.production
echo CORS_ORIGIN=https://sme-crowdfund-vn.vercel.app >> backend\.env.production
echo DATABASE_URL=your-free-render-postgresql-url >> backend\.env.production

echo.
echo ✅ Created free environment files:
echo   - frontend/.env.production
echo   - backend/.env.production
echo.

echo 📋 Remember to:
echo 1. Copy these to platform dashboards
echo 2. Update DATABASE_URL with free Render PostgreSQL URL
echo 3. All platforms offer FREE tiers!
echo.

echo 💰 Total setup cost: $0 - MIỄN PHÍ!
echo.
pause
goto menu

:guide
echo.
echo 📖 Opening free deployment guides...
start FREE-DEPLOYMENT.md
start PRODUCTION-DEPLOYMENT.md
start README.md
echo.
echo 📚 All FREE deployment guides opened
echo 💰 Cost: $0 - Everything is FREE!
echo.
pause
goto menu

:exit
echo.
echo ========================================
echo        FREE DEPLOYMENT SUMMARY
echo ========================================
echo.
echo 🌐 Repository: https://github.com/xuanloc2k4deptrai/sme-crowdfund-vn
echo 📖 FREE Guide: FREE-DEPLOYMENT.md
echo.
echo 💰 COST BREAKDOWN (100%% FREE):
echo   Frontend (Vercel): $0/month
echo   Backend (Render): $0/month  
echo   Database (PostgreSQL): $0/month
echo   GitHub (hosting): $0/month
echo   ================================
echo   TOTAL: $0/month - HOÀN TOÀN MIỄN PHÍ!
echo.
echo 🎯 FREE PLATFORMS:
echo   Frontend: Vercel.com (100GB/month free)
echo   Backend: Render.com (750 hours/month free)
echo   Database: Render PostgreSQL (1GB free)
echo.
echo 🚀 After FREE deployment:
echo   Website: https://sme-crowdfund-vn.vercel.app
echo   API: https://sme-crowdfund-vn.onrender.com
echo.
echo 🎉 Perfect for demo and testing!
echo 💡 Upgrade only when you have real users
echo.
timeout /t 7
exit

:menu
cls
goto start
