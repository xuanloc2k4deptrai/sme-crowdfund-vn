import type { Metadata } from 'next'
import '../src/styles/globals.css'

export const metadata: Metadata = {
  title: 'SME Crowdfund VN',
  description: 'Nền tảng gọi vốn cộng đồng cho doanh nghiệp nhỏ và vừa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
