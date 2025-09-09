# Quick Start Guide
# For immediate development and testing

# 1. Start Development (Recommended)
./launch.bat
# Select option 1 for development servers

# 2. Manual Start
# Terminal 1: Frontend
cd frontend
npm run dev

# Terminal 2: Backend  
cd backend
npx ts-node src/simple-server.ts

# 3. Access URLs
# Frontend: http://localhost:3002
# Backend: http://localhost:5000

# 4. Test Users
# Business User:
#   Email: business@test.com
#   Password: password123

# Investor User:  
#   Email: investor@test.com
#   Password: password123
