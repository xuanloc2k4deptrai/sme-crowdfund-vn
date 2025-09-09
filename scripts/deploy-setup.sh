#!/bin/bash

# SME CrowdFund VN - Production Setup Script
echo "🚀 SME CrowdFund VN - Production Setup"
echo "======================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm found: $(npm --version)${NC}"

echo ""
echo "📦 Installing Dependencies..."

# Install Frontend Dependencies
echo -e "${YELLOW}📱 Installing Frontend dependencies...${NC}"
cd frontend
npm install --production
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

# Install Backend Dependencies  
echo -e "${YELLOW}🔧 Installing Backend dependencies...${NC}"
cd ../backend
npm install --production
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

echo ""
echo "🏗️ Building for Production..."

# Build Frontend
echo -e "${YELLOW}📱 Building Frontend...${NC}"
cd ../frontend
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend build successful${NC}"
else
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi

# Build Backend
echo -e "${YELLOW}🔧 Building Backend...${NC}"
cd ../backend
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend build successful${NC}"
else
    echo -e "${RED}❌ Backend build failed${NC}"
    exit 1
fi

echo ""
echo "🎯 Production Setup Complete!"
echo "=============================="
echo -e "${GREEN}✅ Frontend built and ready${NC}"
echo -e "${GREEN}✅ Backend built and ready${NC}"
echo ""
echo "🚀 Next Steps:"
echo "1. Configure environment variables"
echo "2. Deploy to your hosting platform"
echo "3. Update API URLs for production"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo -e "${GREEN}🎉 Ready for production deployment!${NC}"
