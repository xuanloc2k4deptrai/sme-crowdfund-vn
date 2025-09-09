# 🚀 SME CrowdFund VN - Production Deployment Guide

## 🎯 RECOMMENDED DEPLOYMENT ARCHITECTURE

### Frontend: Vercel
- **URL**: https://sme-crowdfund-vn.vercel.app
- **Features**: Next.js optimized, Global CDN, Auto SSL
- **Cost**: Free tier (sufficient for MVP)

### Backend: Railway  
- **URL**: https://your-app.railway.app
- **Features**: Express.js, PostgreSQL, Auto scaling
- **Cost**: $5/month credit (free to start)

### Database: Railway PostgreSQL
- **Features**: Managed PostgreSQL, Automatic backups
- **Cost**: Included in Railway plan

## 📋 STEP-BY-STEP DEPLOYMENT

### 🌐 STEP 1: Deploy Frontend to Vercel

#### 1.1 Connect GitHub to Vercel
1. Visit: https://vercel.com
2. Sign up with GitHub account
3. Click "New Project"
4. Import: `xuanloc2k4deptrai/sme-crowdfund-vn`
5. **Framework**: Next.js
6. **Root Directory**: `frontend`

#### 1.2 Configure Environment Variables
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_SITE_URL=https://sme-crowdfund-vn.vercel.app
NODE_ENV=production
```

#### 1.3 Advanced Settings
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm ci`

### 🔧 STEP 2: Deploy Backend to Railway

#### 2.1 Connect GitHub to Railway
1. Visit: https://railway.app
2. Sign up with GitHub account  
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose: `xuanloc2k4deptrai/sme-crowdfund-vn`
6. **Root Directory**: `backend`

#### 2.2 Configure Environment Variables
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=your-super-secure-jwt-secret-here
CORS_ORIGIN=https://sme-crowdfund-vn.vercel.app
```

#### 2.3 Add PostgreSQL Database
1. In Railway dashboard, click "New"
2. Select "PostgreSQL"
3. Database will auto-connect via `DATABASE_URL`

### 🔄 STEP 3: Configure Auto Deployment

#### 3.1 Update GitHub Workflow
File: `.github/workflows/deploy.yml` (already created)

#### 3.2 Setup Secrets in GitHub
Go to: https://github.com/xuanloc2k4deptrai/sme-crowdfund-vn/settings/secrets/actions

Add secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID` 
- `VERCEL_PROJECT_ID`

## 🛠️ PRODUCTION CONFIGURATION

### Frontend Environment (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_SITE_URL=https://sme-crowdfund-vn.vercel.app
NEXT_PUBLIC_APP_NAME="SME CrowdFund VN"
NODE_ENV=production
```

### Backend Environment (.env)
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters
CORS_ORIGIN=https://sme-crowdfund-vn.vercel.app
```

## 📊 EXPECTED COSTS

### Free Tier (MVP Testing)
- **Vercel**: Free (100GB bandwidth, unlimited projects)
- **Railway**: $5 credit/month (should last 1-2 months)
- **Total**: ~$0-5/month

### Paid Tier (Production)
- **Vercel Pro**: $20/month (team features, analytics)
- **Railway**: $5-20/month (based on usage)
- **Total**: ~$25-40/month

## 🎯 PERFORMANCE TARGETS

### Frontend (Vercel)
- **Load Time**: <2 seconds
- **Lighthouse Score**: 90+
- **Global CDN**: <100ms worldwide

### Backend (Railway)
- **API Response**: <200ms
- **Uptime**: 99.9%
- **Auto Scaling**: Based on traffic

## 🔐 SECURITY FEATURES

### SSL/TLS
- **Auto SSL** on both platforms
- **HTTPS redirect** enabled
- **Security headers** configured

### Environment Security
- **Secrets management** via platform dashboards
- **Environment isolation** 
- **No hardcoded credentials**

## 📈 MONITORING & ANALYTICS

### Built-in Monitoring
- **Vercel Analytics**: User behavior, performance
- **Railway Metrics**: Server performance, database usage
- **GitHub Actions**: Build & deploy status

### Custom Monitoring (Optional)
- **Sentry**: Error tracking
- **LogRocket**: User session replay
- **Mixpanel**: Business analytics

## 🚀 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] Environment variables configured
- [ ] Database schema ready
- [ ] API endpoints tested
- [ ] Frontend build successful

### Deployment
- [ ] Vercel project created & deployed
- [ ] Railway project created & deployed
- [ ] Database connected & migrated
- [ ] Environment variables set
- [ ] Custom domain configured (optional)

### Post-Deployment
- [ ] Test all user flows
- [ ] Verify API connectivity
- [ ] Check authentication
- [ ] Test payment flows
- [ ] Monitor performance

## 🔗 USEFUL LINKS

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Dashboard**: https://railway.app/dashboard
- **GitHub Repository**: https://github.com/xuanloc2k4deptrai/sme-crowdfund-vn
- **Live Frontend**: https://sme-crowdfund-vn.vercel.app (after deployment)
- **API Endpoint**: https://your-backend.railway.app/api (after deployment)

---

**🎉 Ready to launch SME CrowdFund VN to production!**
