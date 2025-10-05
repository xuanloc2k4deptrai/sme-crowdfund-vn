import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '../src/components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Về chúng tôi | SME CrowdFund VN</title>
        <meta name="description" content="Tìm hiểu về SME CrowdFund VN - nền tảng gọi vốn cộng đồng hàng đầu cho doanh nghiệp vừa và nhỏ tại Việt Nam" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">
              Về SME CrowdFund VN
            </h1>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              Nền tảng gọi vốn cộng đồng hàng đầu dành cho doanh nghiệp vừa và nhỏ tại Việt Nam
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Chúng tôi cam kết tạo ra một nền tảng minh bạch, an toàn và hiệu quả để kết nối 
                các doanh nghiệp vừa và nhỏ với cộng đồng nhà đầu tư tại Việt Nam.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Thông qua công nghệ hiện đại và quy trình chặt chẽ, chúng tôi hỗ trợ các SME 
                tiếp cận nguồn vốn một cách dễ dàng và tạo cơ hội đầu tư hấp dẫn cho cộng đồng.
              </p>
              <Link href="/campaigns">
                <Button variant="primary" size="lg">
                  Khám phá các dự án
                </Button>
              </Link>
            </div>
            <div className="bg-blue-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Uy tín & Minh bạch</h3>
                <p className="text-blue-700">
                  Mọi giao dịch đều được kiểm soát chặt chẽ và công khai minh bạch
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thành tựu của chúng tôi
            </h2>
            <p className="text-lg text-gray-600">
              Những con số ấn tượng minh chứng cho sự phát triển vững mạnh
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">1.2T+</div>
              <div className="text-gray-600">Tổng vốn gọi được</div>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-md">
              <div className="text-4xl font-bold text-green-600 mb-2">350+</div>
              <div className="text-gray-600">Dự án thành công</div>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-md">
              <div className="text-4xl font-bold text-purple-600 mb-2">15K+</div>
              <div className="text-gray-600">Nhà đầu tư tích cực</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sẵn sàng bắt đầu hành trình gọi vốn?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Hãy để chúng tôi hỗ trợ bạn hiện thực hóa ý tưởng kinh doanh của mình
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/campaigns">
              <Button variant="accent" size="lg">
                Khám phá dự án
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="light" size="lg">
                Liên hệ với chúng tôi
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
