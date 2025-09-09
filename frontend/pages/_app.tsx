import '../src/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../src/contexts/AuthContext'
import HeaderSimple from '../src/components/layout/HeaderSimple'
import Footer from '../src/components/layout/Footer'
import AIAssistant from '../src/components/ui/AIAssistant'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Các trang chức năng không cần hiển thị phần marketing
  const functionalPages = [
    '/dashboard',
    '/campaigns', 
    '/login',
    '/register'
  ];
  
  // Kiểm tra xem có phải trang chức năng không
  const isFunctionalPage = functionalPages.some(page => 
    router.pathname.startsWith(page)
  );

  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <HeaderSimple />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer showTestimonials={!isFunctionalPage} />
        <AIAssistant />
      </div>
    </AuthProvider>
  )
}