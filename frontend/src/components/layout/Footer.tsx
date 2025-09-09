import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

interface FooterProps {
  showTestimonials?: boolean;
}

const Footer: React.FC<FooterProps> = ({ showTestimonials = true }) => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-navy-900 text-white">
            {/* Testimonials Section - chỉ hiển thị khi showTestimonials = true */}
            {showTestimonials && (
                <div className="bg-navy-900 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="bg-navy-800 text-yellow-400 text-sm font-medium px-4 py-1.5 rounded-full">Phản hồi từ khách hàng</span>
                        <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white">
                            Câu chuyện thành công từ các doanh nghiệp
                        </h2>
                        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                            Những chia sẻ từ doanh nghiệp đã gọi vốn thành công qua nền tảng của chúng tôi
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-navy-800 p-8 rounded-2xl shadow-sm border border-navy-700">
                            <div className="flex items-center mb-6">
                                <div className="w-14 h-14 bg-yellow-500 text-navy-900 rounded-full flex items-center justify-center font-bold text-lg">TV</div>
                                <div className="ml-4">
                                    <h3 className="font-bold text-lg text-white">Lê Vũ Sao Mai</h3>
                                    <p className="text-gray-400 text-sm">CEO, LƠ LỪNG COFFE</p>
                                </div>
                            </div>
                            <div className="flex mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-300 mb-4">
                                "Với sự hỗ trợ từ nền tảng, chúng tôi đã huy động thành công 5 tỷ đồng trong vòng 30 ngày. Quy trình chuyên nghiệp, minh bạch và đội ngũ hỗ trợ tận tâm."
                            </p>
                            <div className="text-yellow-400 font-medium">
                                Gọi vốn thành công: 5 tỷ VND
                            </div>
                        </div>
                        
                        {/* Testimonial 2 */}
                        <div className="bg-navy-800 p-8 rounded-2xl shadow-sm border border-navy-700">
                            <div className="flex items-center mb-6">
                                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">NH</div>
                                <div className="ml-4">
                                    <h3 className="font-bold text-lg text-white">Lưu Thị Trân Trân</h3>
                                    <p className="text-gray-400 text-sm">Founder, Eco Green</p>
                                </div>
                            </div>
                            <div className="flex mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-300 mb-4">
                                "Không chỉ giúp chúng tôi gọi vốn thành công, nền tảng còn kết nối chúng tôi với nhiều đối tác chiến lược, mở ra cơ hội hợp tác mới cho doanh nghiệp."
                            </p>
                            <div className="text-yellow-400 font-medium">
                                Gọi vốn thành công: 3.5 tỷ VND
                            </div>
                        </div>
                        
                        {/* Testimonial 3 */}
                        <div className="bg-navy-800 p-8 rounded-2xl shadow-sm border border-navy-700">
                            <div className="flex items-center mb-6">
                                <div className="w-14 h-14 bg-yellow-500 text-navy-900 rounded-full flex items-center justify-center font-bold text-lg">LT</div>
                                <div className="ml-4">
                                    <h3 className="font-bold text-lg text-white">Bùi Thị Khánh Huyền</h3>
                                    <p className="text-gray-400 text-sm">CEO, Food Connect</p>
                                </div>
                            </div>
                            <div className="flex mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-300 mb-4">
                                "Đội ngũ tư vấn chuyên nghiệp đã giúp chúng tôi xây dựng chiến dịch gọi vốn hấp dẫn. Trong 45 ngày, chúng tôi đã vượt chỉ tiêu 20% so với mục tiêu ban đầu."
                            </p>
                            <div className="text-yellow-400 font-medium">
                                Gọi vốn thành công: 7.2 tỷ VND
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
            
            {/* FAQ Section - chỉ hiển thị trên trang chủ */}
            {showTestimonials && (
            <div className="bg-navy-800 py-16 border-t border-navy-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="bg-navy-700 text-yellow-400 text-sm font-medium px-4 py-1.5 rounded-full">Câu hỏi thường gặp</span>
                        <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white">
                            Giải đáp thắc mắc của bạn
                        </h2>
                        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                            Những câu hỏi phổ biến từ doanh nghiệp và nhà đầu tư về nền tảng của chúng tôi
                        </p>
                    </div>
                    
                    <div className="max-w-3xl mx-auto">
                        {/* FAQ Item 1 */}
                        <div className="mb-6 border-b border-navy-700 pb-6">
                            <h3 className="text-xl font-bold text-white mb-3">Ai có thể gọi vốn trên nền tảng?</h3>
                            <p className="text-gray-300">
                                Các doanh nghiệp vừa và nhỏ (SME) tại Việt Nam có thời gian hoạt động tối thiểu 1 năm, có báo cáo tài chính minh bạch và có kế hoạch kinh doanh rõ ràng đều có thể đăng ký gọi vốn trên nền tảng của chúng tôi.
                            </p>
                        </div>
                        
                        {/* FAQ Item 2 */}
                        <div className="mb-6 border-b border-navy-700 pb-6">
                            <h3 className="text-xl font-bold text-white mb-3">Mức đầu tư tối thiểu là bao nhiêu?</h3>
                            <p className="text-gray-300">
                                Mức đầu tư tối thiểu phụ thuộc vào từng dự án, thông thường từ 10 triệu VND. Các nhà đầu tư có thể tham gia với số vốn phù hợp với khả năng tài chính của mình.
                            </p>
                        </div>
                        
                        {/* FAQ Item 3 */}
                        <div className="mb-6 border-b border-navy-700 pb-6">
                            <h3 className="text-xl font-bold text-white mb-3">Làm thế nào để đảm bảo an toàn cho nhà đầu tư?</h3>
                            <p className="text-gray-300">
                                Chúng tôi thực hiện thẩm định kỹ lưỡng mỗi doanh nghiệp trước khi cho phép gọi vốn trên nền tảng. Ngoài ra, chúng tôi cung cấp đầy đủ thông tin minh bạch về doanh nghiệp, tình hình tài chính và kế hoạch sử dụng vốn để nhà đầu tư có thể đưa ra quyết định sáng suốt.
                            </p>
                        </div>
                        
                        {/* FAQ Item 4 */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-3">Quy trình gọi vốn kéo dài bao lâu?</h3>
                            <p className="text-gray-300">
                                Từ khi đăng ký đến khi chiến dịch được phê duyệt và ra mắt thường mất khoảng 2-4 tuần. Thời gian gọi vốn trên nền tảng thường kéo dài từ 30-90 ngày tùy thuộc vào quy mô và mục tiêu của chiến dịch.
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-10 text-center">
                        <div className="bg-navy-700 p-8 rounded-2xl max-w-3xl mx-auto">
                            <h3 className="text-xl font-bold text-white mb-4">Vẫn còn thắc mắc?</h3>
                            <p className="text-gray-300 mb-6">
                                Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi câu hỏi của bạn
                            </p>
                            <Link href="/contact">
                                <Button variant="secondary" className="bg-yellow-400 border-0 text-navy-900 hover:bg-yellow-500">
                                    Liên hệ với chúng tôi
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            )}
            
            {/* Main Footer */}
            <div className="pt-16 pb-8 border-t border-navy-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center mb-6">
                                <svg className="w-10 h-10 text-white" 
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a1 1 0 011-1h8a1 1 0 011 1zM9 11H7v2h2v-2zm4 0h-2v2h2v-2z" clipRule="evenodd" />
                                </svg>
                                <div className="ml-3 flex flex-col">
                                    <div className="flex items-baseline">
                                        <span className="text-xl font-bold text-white">SME Crowdfund</span>
                                        <span className="ml-1 text-sm font-semibold bg-yellow-400 text-navy-900 px-1.5 rounded shadow-sm">VN</span>
                                    </div>
                                    <span className="text-xs font-medium bg-blue-400/30 text-white px-2 py-0.5 rounded font-bold">VIỆT NAM</span>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-6">
                                Nền tảng gọi vốn cộng đồng hàng đầu dành cho doanh nghiệp vừa và nhỏ tại Việt Nam.
                            </p>
                            <div className="flex space-x-4">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                                className="bg-navy-800 hover:bg-navy-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                                className="bg-navy-800 hover:bg-navy-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                                className="bg-navy-800 hover:bg-navy-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-white">Doanh nghiệp</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/business/how-it-works" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                                        Cách thức hoạt động
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/business/start-campaign" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                                        Bắt đầu chiến dịch
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/business/success-stories" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                                        Câu chuyện thành công
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/business/resources" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                                        Tài nguyên & Hướng dẫn
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-white">Nhà đầu tư</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/investor/why-invest" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                                        Tại sao đầu tư
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/investor/how-to-invest" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                                        Cách thức đầu tư
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/investor/risks" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                                        Hiểu về rủi ro
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/campaigns" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                                        Khám phá dự án
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-white">Liên hệ</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 mr-3 mt-0.5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-gray-300 text-sm">
                                        Trường Kinh tế - Trường Đại học Vinh<br />
                                        Số 182 Lê Duẩn, Phường Hưng Dũng, Thành phố Vinh, Tỉnh Nghệ An, Việt Nam
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="mailto:info@smecrowdfund.vn" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                                        info@smecrowdfund.vn
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <a href="tel:+84123456789" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                                        +84 (0) 973642106
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Newsletter */}
                    <div className="border-t border-navy-800 pt-8 pb-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-6 md:mb-0 md:w-1/2">
                                <h4 className="text-lg font-bold text-white mb-2">Đăng ký nhận bản tin</h4>
                                <p className="text-gray-300 text-sm">Nhận thông tin mới nhất về các dự án và cơ hội đầu tư</p>
                            </div>
                            <div className="w-full md:w-1/2">
                                <form className="flex">
                                    <input 
                                        type="email" 
                                        placeholder="Email của bạn" 
                                        className="flex-grow p-3 rounded-l-lg focus:outline-none text-gray-900"
                                    />
                                    <button 
                                        type="submit" 
                                        className="bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-medium px-4 py-3 rounded-r-lg transition-colors duration-200"
                                    >
                                        Đăng ký
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom bar */}
                    <div className="border-t border-navy-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-400 mb-4 md:mb-0">
                            &copy; {currentYear} SME Crowdfund Việt Nam. Đã đăng ký Bản quyền.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-end space-x-6">
                            <Link href="/terms" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200 mb-2 md:mb-0">
                                Điều khoản dịch vụ
                            </Link>
                            <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200 mb-2 md:mb-0">
                                Chính sách bảo mật
                            </Link>
                            <Link href="/legal" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200 mb-2 md:mb-0">
                                Thông tin pháp lý
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;