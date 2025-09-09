# SME CrowdFund VN - Production Deployment Guide

## 🚀 QUICK START

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Domain name
- Hosting service (Vercel, Netlify, VPS)

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd sme-crowdfund-vn
```

### 2. Install Dependencies
```bash
# Frontend
cd frontend
npm install

# Backend  
cd ../backend
npm install
```

### 3. Environment Configuration

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production
```

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your-production-database-url
JWT_SECRET=your-super-secure-jwt-secret
CORS_ORIGIN=https://your-domain.com
```

### 4. Build for Production
```bash
# Frontend
cd frontend
npm run build
npm run export  # For static hosting

# Backend
cd ../backend
npm run build
```

### 5. Deployment Options

#### Option A: Vercel (Recommended for Frontend)
```bash
cd frontend
npm install -g vercel
vercel --prod
```

#### Option B: VPS/Server
```bash
# Frontend (serve static files)
cd frontend
npm run build
npx serve out

# Backend
cd ../backend
npm run start
```

#### Option C: Docker
```bash
docker-compose up --build -d
```

## 📊 CURRENT STATUS

### ✅ Ready for Production
- [x] Authentication system
- [x] Dashboard features
- [x] AI components
- [x] Responsive design
- [x] Type safety
- [x] Error handling
- [x] CORS configuration

### 🔄 URLs
- **Frontend**: http://localhost:3002 (dev) → https://your-domain.com (prod)
- **Backend**: http://localhost:5000 (dev) → https://api.your-domain.com (prod)

## 🎯 USER FEATURES

### For Investors
- Portfolio tracking
- Investment opportunities
- AI recommendations
- Performance analytics
- Real-time notifications

### For Businesses  
- Campaign creation
- Fundraising management
- Investor analytics
- Progress tracking
- AI insights

## 🛡️ Security Features
- JWT authentication
- Role-based access
- CORS protection
- Input validation
- Error handling

## 📱 Mobile Ready
- Responsive design
- Touch-friendly interface
- Mobile optimization
- Cross-platform compatibility

---

**Dự án sẵn sàng cho triển khai production!** 🚀
