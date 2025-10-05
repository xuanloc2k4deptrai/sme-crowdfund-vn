import React, { useState } from 'react';
import Head from 'next/head';
import Button from 'src/components/ui/Button';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.name || !formState.email || !formState.message) {
      setSubmitStatus({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin bắt buộc.'
      });
      return;
    }

    // For now, we'll just simulate a successful form submission
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        success: true,
        message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.'
      });
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Liên hệ | SME CrowdFund VN</title>
        <meta name="description" content="Liên hệ với SME CrowdFund VN - Nền tảng gọi vốn cộng đồng hàng đầu cho doanh nghiệp vừa và nhỏ tại Việt Nam" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Liên hệ với chúng tôi</h1>
            <p className="text-xl text-blue-100 mb-8">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy cho chúng tôi biết làm thế nào chúng tôi có thể giúp đỡ.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn cho chúng tôi</h2>
              
              {submitStatus && (
                <div className={`p-4 mb-6 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Chủ đề
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">-- Chọn chủ đề --</option>
                    <option value="Đầu tư">Thông tin về đầu tư</option>
                    <option value="Gọi vốn">Thông tin về gọi vốn</option>
                    <option value="Hợp tác">Đề xuất hợp tác</option>
                    <option value="Hỗ trợ kỹ thuật">Hỗ trợ kỹ thuật</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Hãy cho chúng tôi biết chúng tôi có thể giúp gì cho bạn..."
                  ></textarea>
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    Gửi tin nhắn
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Contact Info */}
            <div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-white/20 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Địa chỉ</h3>
                      <p className="text-blue-100">Trường Kinh tế - Trường Đại học Vinh
  Số 182 Lê Duẩn, Phường Hưng Dũng, Thành phố Vinh, Tỉnh Nghệ An, Việt Nam</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-white/20 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Điện thoại</h3>
                      <p className="text-blue-100">+84 973642106</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-white/20 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <p className="text-blue-100">info@smecrowdfundvn.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-white/20 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Giờ làm việc</h3>
                      <p className="text-blue-100">Thứ 2 - Thứ 6: 8:30 - 17:30<br />Thứ 7: 9:00 - 12:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Kết nối với chúng tôi</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['Facebook', 'Twitter', 'LinkedIn', 'YouTube'].map((platform, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors duration-300"
                    >
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vị trí của chúng tôi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ghé thăm văn phòng của chúng tôi tại trung tâm TP. Vinh
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-96">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <div className="text-center p-4">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-gray-500">Bản đồ vị trí công ty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tìm câu trả lời nhanh cho những câu hỏi phổ biến nhất về dịch vụ của chúng tôi
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {[
              {
                question: 'SME CrowdFund VN là gì?',
                answer: 'SME CrowdFund VN là nền tảng gọi vốn cộng đồng (crowdfunding) đầu tiên tại Việt Nam được thiết kế đặc biệt cho doanh nghiệp vừa và nhỏ (SME). Chúng tôi kết nối các doanh nghiệp có tiềm năng với cộng đồng nhà đầu tư, giúp doanh nghiệp huy động vốn và mở rộng hoạt động kinh doanh.'
              },
              {
                question: 'Làm thế nào để tôi có thể đầu tư vào một dự án?',
                answer: 'Để đầu tư vào một dự án, bạn cần đăng ký tài khoản nhà đầu tư trên nền tảng của chúng tôi, hoàn tất quá trình xác minh danh tính, nạp tiền vào tài khoản và sau đó bạn có thể lựa chọn dự án phù hợp để đầu tư. Chúng tôi cung cấp đầy đủ thông tin về mỗi dự án để bạn có thể đưa ra quyết định đầu tư sáng suốt.'
              },
              {
                question: 'Làm thế nào để doanh nghiệp của tôi có thể gọi vốn trên nền tảng này?',
                answer: 'Doanh nghiệp muốn gọi vốn trên nền tảng của chúng tôi cần đăng ký tài khoản doanh nghiệp, cung cấp đầy đủ thông tin và tài liệu cần thiết về doanh nghiệp, dự án và kế hoạch kinh doanh. Sau khi được đội ngũ chuyên gia của chúng tôi đánh giá và phê duyệt, dự án của bạn sẽ được đăng tải trên nền tảng để nhà đầu tư có thể xem xét và đầu tư.'
              },
              {
                question: 'Nền tảng có an toàn và đáng tin cậy không?',
                answer: 'Có, an toàn và bảo mật là ưu tiên hàng đầu của chúng tôi. Chúng tôi áp dụng các biện pháp bảo mật tiên tiến nhất để bảo vệ thông tin cá nhân và giao dịch của người dùng. Đồng thời, chúng tôi cũng có quy trình thẩm định chặt chẽ đối với các dự án được đăng tải trên nền tảng, đảm bảo tính minh bạch và đáng tin cậy.'
              },
              {
                question: 'Tôi có thể rút vốn đầu tư của mình bất cứ lúc nào không?',
                answer: 'Việc rút vốn đầu tư phụ thuộc vào điều khoản của từng dự án cụ thể. Thông thường, các khoản đầu tư có thời hạn nhất định và bạn sẽ nhận được lợi nhuận theo kỳ hạn đã thỏa thuận. Chúng tôi khuyến nghị nhà đầu tư đọc kỹ điều khoản và điều kiện của mỗi dự án trước khi quyết định đầu tư.'
              }
            ].map((faq, index) => (
              <div key={index} className="py-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
