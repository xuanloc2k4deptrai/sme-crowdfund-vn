@echo off
title SME CrowdFund VN - GitHub Setup
color 0B

echo.
echo ========================================
echo   SME CrowdFund VN - GitHub Setup
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed!
    echo.
    echo Please install Git first:
    echo 1. Download from: https://git-scm.com/download/win
    echo 2. Install with default settings
    echo 3. Restart this script
    echo.
    echo Or install via winget:
    echo winget install --id Git.Git -e --source winget
    echo.
    pause
    exit /b 1
)

echo ✅ Git is installed
echo.

REM Check if already a git repository
if exist .git (
    echo ✅ Git repository already exists
) else (
    echo 📁 Initializing Git repository...
    git init
    echo ✅ Git repository initialized
)

echo.
echo 🔧 Git Configuration
echo.

REM Configure git if not configured
for /f "tokens=*" %%i in ('git config --global user.name') do set username=%%i
for /f "tokens=*" %%i in ('git config --global user.email') do set useremail=%%i

if "%username%"=="" (
    set /p "gitname=Enter your name: "
    git config --global user.name "%gitname%"
) else (
    echo ✅ Git user name: %username%
)

if "%useremail%"=="" (
    set /p "gitemail=Enter your email: "
    git config --global user.email "%gitemail%"
) else (
    echo ✅ Git user email: %useremail%
)

echo.
echo 📦 Adding files to Git...
git add .

echo.
echo 💬 Creating commit...
git commit -m "🚀 Initial commit: SME CrowdFund VN Platform

✅ Features implemented:
- Business & Investor dashboards with AI integration
- JWT Authentication system  
- Campaign management & tracking
- Real-time notifications
- Smart analytics & recommendations
- Responsive design for all devices
- Production-ready build configuration

🏗️ Tech Stack:
- Frontend: Next.js 15.5.2, TypeScript, Tailwind CSS
- Backend: Express.js, TypeScript, CORS enabled
- AI Features: Smart Analytics & Intelligent Notifications
- Authentication: JWT with role-based access

🎯 Status: Ready for production deployment
📱 URLs: Frontend (3002), Backend (5000)
🚀 Platform: SME CrowdFunding for Vietnam market"

echo.
echo 🌐 GitHub Repository Setup
echo.
echo Please create a repository on GitHub:
echo 1. Go to: https://github.com/new
echo 2. Repository name: sme-crowdfund-vn
echo 3. Description: SME CrowdFunding Platform for Vietnam
echo 4. Choose Public or Private
echo 5. DO NOT initialize with README (we have one)
echo 6. Click "Create repository"
echo.

set /p "githubuser=Enter your GitHub username: "
set /p "reponame=Enter repository name (default: sme-crowdfund-vn): "

if "%reponame%"=="" set reponame=sme-crowdfund-vn

echo.
echo 🔗 Adding remote origin...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/%githubuser%/%reponame%.git

echo.
echo 🚀 Pushing to GitHub...
git branch -M main
git push -u origin main

if %errorlevel% eq 0 (
    echo.
    echo ✅ SUCCESS! Code pushed to GitHub
    echo.
    echo 🎉 Your repository is now available at:
    echo https://github.com/%githubuser%/%reponame%
    echo.
    echo 📋 Next steps:
    echo 1. Share repository with team members
    echo 2. Set up deployment on Vercel/Netlify
    echo 3. Configure production environment variables
    echo.
) else (
    echo.
    echo ❌ Push failed. Please check:
    echo 1. GitHub credentials
    echo 2. Repository exists
    echo 3. Internet connection
    echo.
    echo Try manual push:
    echo git push -u origin main
    echo.
)

echo 📖 See GITHUB-SETUP.md for detailed instructions
echo.
pause
