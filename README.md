# 🚀 SME Crowdfunding Vietnam Platform

Nền tảng gọi vốn cộng đồng hiện đại cho các doanh nghiệp vừa và nhỏ tại Việt Nam.

## ✨ Tính năng chính

- 🔐 **Hệ thống thanh toán bảo mật** với 5 nhà cung cấp (VNPay, MoMo, ZaloPay, VietQR, Stripe)
- 💼 **Dashboard quản lý** cho doanh nghiệp và nhà đầu tư
- 📊 **Theo dõi tiến độ** real-time với hệ thống màu sắc động
- 🎨 **UI/UX hiện đại** với Tailwind CSS và animations
- 📱 **Responsive design** tối ưu cho mọi thiết bị
- 🔒 **Bảo mật cao** với mã hóa AES-256 và JWT authentication

## 🛠️ Công nghệ sử dụng

### Frontend
- **Next.js 15.5.2** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Prisma** - Database ORM
- **SQLite** - Database

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
npm install -g vercel
vercel --prod
```

### Local Development
```bash
# Clone repository
git clone https://github.com/xuanloc2k4deptrai/sme-crowdfund-vn.git

# Install dependencies
cd sme-crowdfund-vn/frontend
npm install

# Start development server
npm run dev
```

## 📁 Cấu trúc project

```
sme-crowdfund-vn/
├── frontend/           # Next.js frontend application
├── backend/           # Node.js backend API
├── infra/            # Docker & deployment configs
└── scripts/          # Setup & utility scripts
```

## 🌐 Live Demo

- **Frontend**: [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)
- **Payment Demo**: [https://your-vercel-url.vercel.app/payment/demo](https://your-vercel-url.vercel.app/payment/demo)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email: support@sme-crowdfund-vn.com