# 🔧 VERCEL DEPLOYMENT - STEP BY STEP FIX

## ❌ COMMON ERROR:
"Không phát hiện phiên bản Next.js. Hãy đảm bảo package.json của bạn có "next" trong "dependencies""

## ✅ SOLUTION: Root Directory Configuration

### METHOD 1: Fix Current Project

#### Step 1: Go to Project Settings
1. **Vercel Dashboard** → Your project
2. **Settings tab**
3. **General section**

#### Step 2: Fix Root Directory
1. Find **"Root Directory"** setting
2. **Current**: (empty) or "." ❌
3. **Change to**: `frontend` ✅
4. **Save Changes**

#### Step 3: Redeploy
1. **Deployments tab**
2. **Latest deployment** → **3 dots menu**
3. **Redeploy**
4. **Use existing build cache**: ❌ (uncheck)

### METHOD 2: Fresh Import (Recommended)

#### Step 1: Delete Current Project
1. **Project Settings** → **Advanced**
2. **Delete Project**
3. **Confirm deletion**

#### Step 2: Import Fresh
1. **Vercel Dashboard** → **New Project**
2. **Import Git Repository**
3. **Repository**: `xuanloc2k4deptrai/sme-crowdfund-vn`

#### Step 3: Configure Correctly
```
Project Name: sme-crowdfund-vn
Framework Preset: Next.js ← Should auto-detect
Root Directory: frontend ← CRITICAL!
Build Command: npm run build ← Auto
Output Directory: .next ← Auto
Install Command: npm ci ← Auto
Node.js Version: 18.x ← Auto
```

#### Step 4: Environment Variables
Add these in **Environment Variables** section:
```
NEXT_PUBLIC_API_URL=https://sme-crowdfund-vn.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://sme-crowdfund-vn.vercel.app
NODE_ENV=production
```

#### Step 5: Deploy
1. **Deploy button** (blue)
2. **Build time**: ~2-3 minutes
3. **Success**: ✅ Deployment completed

## 🎯 VERIFICATION

### After Successful Deploy:
```
✅ Framework: Next.js 15.5.2 detected
✅ Installing dependencies from frontend/package.json
✅ Running "npm run build" in frontend directory
✅ Build completed successfully
✅ Deployment URL: https://sme-crowdfund-vn.vercel.app
```

### Build Logs Should Show:
```
✅ Detected Next.js
✅ Installing dependencies...
✅ Building application...
✅ Optimizing production build...
✅ Build completed in 2m 15s
```

## 🚨 TROUBLESHOOTING

### If Still Getting Error:

#### Check 1: Repository Structure
```
sme-crowdfund-vn/
├── frontend/
│   ├── package.json ← Next.js here
│   ├── next.config.js
│   └── src/
└── backend/
    └── package.json ← Express here
```

#### Check 2: Frontend package.json
File: `frontend/package.json` should contain:
```json
{
  "dependencies": {
    "next": "^15.5.2",  ← Must be present
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  }
}
```

#### Check 3: Vercel Settings
- **Root Directory**: `frontend` ✅
- **Framework**: Next.js ✅
- **Build Command**: `npm run build` ✅

## 📞 QUICK FIX COMMANDS

### If you want to verify locally:
```bash
cd frontend
ls package.json  # Should exist
cat package.json | grep "next"  # Should show Next.js
npm run build  # Should work locally
```

---

**🎯 The key is setting Root Directory to `frontend` in Vercel dashboard!**
