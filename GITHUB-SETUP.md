# 🚀 Hướng dẫn Push Code lên GitHub

## Bước 1: Cài đặt Git

### Download Git for Windows
1. Truy cập: https://git-scm.com/download/win
2. Download phiên bản mới nhất
3. Cài đặt với settings mặc định
4. Restart terminal sau khi cài đặt

### Hoặc cài qua Chocolatey (nếu có)
```powershell
choco install git
```

### Hoặc cài qua winget
```powershell
winget install --id Git.Git -e --source winget
```

## Bước 2: Cấu hình Git (chạy sau khi cài Git)

```bash
# Cấu hình thông tin cá nhân
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Kiểm tra cấu hình
git config --list
```

## Bước 3: Tạo Repository trên GitHub

1. **Đăng nhập GitHub**: https://github.com
2. **Click "New repository"**
3. **Repository name**: `sme-crowdfund-vn`
4. **Description**: `SME CrowdFunding Platform for Vietnam`
5. **Public/Private**: Chọn theo ý muốn
6. **Không tick** "Add a README file" (vì đã có)
7. **Click "Create repository"**

## Bước 4: Push Code lên GitHub

```bash
# Di chuyển vào thư mục project
cd "D:\APP xuanloc\Nền tảng gọi vốn SME\sme-crowdfund-vn"

# Khởi tạo git repository
git init

# Thêm tất cả files
git add .

# Commit đầu tiên
git commit -m "🚀 Initial commit: SME CrowdFund VN Platform

✅ Features implemented:
- Business & Investor dashboards with AI
- Authentication system (JWT)
- Campaign management
- Real-time notifications
- Responsive design
- Production ready

🏗️ Tech Stack:
- Frontend: Next.js 15.5.2, TypeScript, Tailwind
- Backend: Express.js, TypeScript, CORS
- AI Integration: Smart Analytics & Notifications

🎯 Status: Ready for production deployment"

# Thêm remote origin (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/sme-crowdfund-vn.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

## Bước 5: Tạo .gitignore (quan trọng)

Trước khi push, cần tạo .gitignore để loại bỏ files không cần thiết:

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
.next/
out/
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Database
*.db
*.sqlite
prisma/dev.db

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Temporary folders
tmp/
temp/
```

## Bước 6: Repository Structure trên GitHub

Sau khi push, GitHub repository sẽ có cấu trúc:

```
sme-crowdfund-vn/
├── frontend/              # Next.js frontend
├── backend/              # Express backend  
├── scripts/              # Deployment scripts
├── infra/               # Docker & K8s configs
├── .gitignore           # Git ignore rules
├── README.md            # Project documentation
├── DEPLOYMENT.md        # Deployment guide
├── package.json         # Root package.json
└── launch.bat          # Quick launcher
```

## Bước 7: Cấu hình GitHub Pages (Optional)

Nếu muốn host frontend trên GitHub Pages:

1. Vào **Settings** của repository
2. Scroll xuống **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** / folder: **/ (root)**
5. **Save**

## Bước 8: Tạo GitHub Actions cho CI/CD (Optional)

Tạo file `.github/workflows/deploy.yml`:

```yaml
name: Deploy SME CrowdFund VN

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install Frontend Dependencies
      run: |
        cd frontend
        npm install
        
    - name: Install Backend Dependencies  
      run: |
        cd backend
        npm install
        
    - name: Build Frontend
      run: |
        cd frontend
        npm run build
        
    - name: Build Backend
      run: |
        cd backend
        npm run build
```

## Bước 9: Clone và Collaboration

Sau khi push thành công, team members có thể clone:

```bash
git clone https://github.com/YOUR_USERNAME/sme-crowdfund-vn.git
cd sme-crowdfund-vn
npm run setup
```

## 🎯 Quick Commands Reference

```bash
# Kiểm tra status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push changes
git push

# Pull latest changes
git pull

# Check branches
git branch -a

# Create new branch
git checkout -b feature/new-feature
```

## ⚠️ Lưu ý quan trọng

1. **Không commit sensitive data**:
   - Database files (.db)
   - Environment variables (.env)
   - API keys
   - Passwords

2. **Sử dụng .gitignore** để loại bỏ:
   - node_modules/
   - Build files
   - Temporary files

3. **Commit messages rõ ràng**:
   - Sử dụng tiếng Anh hoặc tiếng Việt nhất quán
   - Mô tả ngắn gọn những gì đã thay đổi

---

**Sau khi hoàn thành, bạn sẽ có repository GitHub hoàn chỉnh sẵn sàng cho collaboration và deployment!** 🎉
