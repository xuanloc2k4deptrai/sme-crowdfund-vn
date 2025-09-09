# 🚀 HƯỚNG DẪN DEPLOYMENT LÊN MÁY CHỦ

## 📋 QUY TRÌNH HOẠT ĐỘNG

### 🖥️ HIỆN TẠI (Development):
```
Máy tính của bạn:
├── Next.js Server (localhost:3000)
├── Cloudflare Tunnel
└── Public URL: https://imagine-music-trusted-audio.trycloudflare.com
```

### 🌐 TƯƠNG LAI (Production Server):
```
Máy chủ/VPS:
├── Next.js Server (localhost:3000)
├── Cloudflare Tunnel
└── Public URL: https://xxx.trycloudflare.com (URL mới)
```

## 🔧 CÁC BƯỚC DEPLOY LÊN MÁY CHỦ

### Bước 1: Chuẩn bị máy chủ
```bash
# Cài Node.js trên server
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Hoặc trên Windows Server
# Download và cài Node.js từ nodejs.org
```

### Bước 2: Upload code
```bash
# Copy toàn bộ thư mục project lên server
scp -r "d:\APP xuanloc\Nền tảng gọi vốn SME\sme-crowdfund-vn" user@server:/path/to/project

# Hoặc dùng Git
git clone your-repository
```

### Bước 3: Cài đặt dependencies
```bash
cd /path/to/project/frontend
npm install
npm run build  # Build production
```

### Bước 4: Chạy server trên máy chủ
```bash
# Production mode
npm start

# Hoặc development mode
npm run serve
```

### Bước 5: Tạo tunnel trên máy chủ
```bash
# Cài Cloudflared trên server
npm install -g cloudflared

# Tạo tunnel
npx cloudflared tunnel --url http://localhost:3000
```

## 🎯 KẾT QUẢ

### ✅ Sau khi deploy:
- **Server chạy 24/7** trên máy chủ
- **URL public ổn định**: https://your-domain.trycloudflare.com
- **Truy cập từ bất kỳ đâu** trên thế giới
- **Không cần máy tính cá nhân** luôn bật

## 🔄 GIẢI PHÁP DEPLOYMENT KHÁC

### 1. Vercel (Khuyến nghị - Miễn phí):
```bash
npm install -g vercel
vercel deploy
# Tự động có URL: https://your-project.vercel.app
```

### 2. Netlify:
```bash
npm run build
# Upload folder .next lên Netlify
```

### 3. Railway:
```bash
# Connect GitHub repo
# Tự động deploy và có URL
```

### 4. VPS/Cloud Server:
- AWS EC2, DigitalOcean, Linode
- Cài Node.js, clone code, chạy server
- Dùng PM2 để server chạy liên tục

## 🛠️ SCRIPT TỰ ĐỘNG CHO MÁY CHỦ

```bash
#!/bin/bash
# deploy.sh - Script tự động deploy

# Cài dependencies
npm install

# Build production
npm run build

# Start server với PM2 (chạy background)
npm install -g pm2
pm2 start npm --name "sme-crowdfund" -- start

# Tạo tunnel
npx cloudflared tunnel --url http://localhost:3000
```

## 📝 LƯU Ý QUAN TRỌNG

### ⚠️ URL Cloudflare tạm thời:
- URL hiện tại sẽ **mất** khi bạn tắt tunnel
- Mỗi lần tạo tunnel mới = **URL mới**
- Để có URL cố định → Dùng Vercel/Netlify

### ✅ Để có URL cố định:
1. **Vercel**: `https://sme-crowdfund-vn.vercel.app`
2. **Netlify**: `https://sme-crowdfund-vn.netlify.app`
3. **Domain riêng**: `https://smecrowdfund.com`

## 🎯 KHUYẾN NGHỊ

**Cho production**: Dùng **Vercel** - dễ nhất, miễn phí, URL cố định
**Cho testing**: Tiếp tục dùng Cloudflare tunnel như hiện tại
