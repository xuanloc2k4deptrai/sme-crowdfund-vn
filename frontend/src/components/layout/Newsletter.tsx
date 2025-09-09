import React, { useState } from 'react';
import Button from '../ui/Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Đăng ký nhận thông tin
          </h2>
          <p className="text-gray-600 mb-8">
            Nhận tin tức mới nhất về các dự án tiềm năng và cơ hội đầu tư hấp dẫn
          </p>
          
          {isSubmitted ? (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg animate-fadeIn">
              <p className="font-medium">Cảm ơn bạn đã đăng ký!</p>
              <p className="text-sm mt-1">Chúng tôi sẽ gửi thông tin cập nhật qua email của bạn.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="bg-navy-800 hover:bg-navy-900 text-white py-3 px-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  'Đăng ký'
                )}
              </Button>
            </form>
          )}
          
          <p className="text-gray-500 text-sm mt-4">
            Chúng tôi tôn trọng quyền riêng tư của bạn. Xem chính sách bảo mật của chúng tôi.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
