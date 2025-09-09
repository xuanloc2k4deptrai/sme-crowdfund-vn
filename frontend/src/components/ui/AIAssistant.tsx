import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi là Trợ lý AI của SME Crowdfund VN. Tôi có thể giúp gì cho bạn hôm nay?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle outside click to close the chat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        chatContainerRef.current && 
        !chatContainerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.ai-chat-toggle')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      // Simple response logic based on keywords
      const lowercaseInput = inputValue.toLowerCase();
      
      if (lowercaseInput.includes('xin chào') || lowercaseInput.includes('chào') || lowercaseInput.includes('hi') || lowercaseInput.includes('hello')) {
        response = 'Xin chào! Rất vui được trò chuyện với bạn. Tôi có thể giúp gì cho bạn về các dự án đầu tư?';
      } 
      else if (lowercaseInput.includes('đầu tư') || lowercaseInput.includes('gọi vốn')) {
        response = 'SME Crowdfund VN cung cấp nhiều cơ hội đầu tư hấp dẫn với mức lợi nhuận kỳ vọng từ 12-25% mỗi năm, tùy thuộc vào dự án và loại hình đầu tư. Bạn quan tâm đến lĩnh vực nào?';
      }
      else if (lowercaseInput.includes('ai') || lowercaseInput.includes('trí tuệ nhân tạo')) {
        response = 'Nền tảng của chúng tôi sử dụng trí tuệ nhân tạo để phân tích dự án, đánh giá rủi ro và đề xuất cơ hội đầu tư phù hợp với hồ sơ của bạn. Bạn có thể xem chi tiết tại trang Công nghệ AI của chúng tôi.';
      }
      else if (lowercaseInput.includes('rủi ro')) {
        response = 'Mọi khoản đầu tư đều có rủi ro. Tuy nhiên, AI của chúng tôi đánh giá kỹ lưỡng mỗi dự án dựa trên hơn 50 yếu tố để giảm thiểu rủi ro cho nhà đầu tư. Chúng tôi cũng có quy trình thẩm định nghiêm ngặt và giám sát liên tục các dự án.';
      }
      else if (lowercaseInput.includes('lợi nhuận') || lowercaseInput.includes('lãi suất')) {
        response = 'Lợi nhuận đầu tư phụ thuộc vào loại dự án và hình thức đầu tư. Các dự án cổ phần có thể mang lại lợi nhuận 20-35% nếu thành công, trong khi đầu tư trái phiếu doanh nghiệp thường có lãi suất cố định từ 12-18% mỗi năm.';
      }
      else if (lowercaseInput.includes('đăng ký') || lowercaseInput.includes('tạo tài khoản')) {
        response = 'Để đăng ký tài khoản, bạn có thể nhấp vào nút "Đăng ký" ở góc trên bên phải của trang web. Quá trình đăng ký chỉ mất vài phút và bạn sẽ cần cung cấp một số thông tin cơ bản để xác minh danh tính.';
      }
      else if (lowercaseInput.includes('phí') || lowercaseInput.includes('chi phí')) {
        response = 'SME Crowdfund VN không thu phí từ nhà đầu tư khi tham gia đầu tư vào các dự án. Chúng tôi chỉ thu một khoản phí nhỏ từ doanh nghiệp khi gọi vốn thành công, thường từ 3-5% tổng số tiền huy động được.';
      }
      else {
        response = 'Cảm ơn câu hỏi của bạn. Hệ thống AI của chúng tôi đang phân tích để đưa ra câu trả lời chính xác nhất. Bạn có thể liên hệ với đội ngũ hỗ trợ của chúng tôi qua email support@smecrowdfund.vn hoặc hotline 1900-xxxx để được tư vấn chi tiết hơn.';
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* AI Assistant toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="ai-chat-toggle fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
        )}
      </button>
      
      {/* AI Assistant chat window */}
      {isOpen && (
        <div 
          ref={chatContainerRef}
          className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-200 animate-fadeIn"
        >
          {/* Chat header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">Trợ lý AI</h3>
                <p className="text-xs text-blue-100">Trả lời trong vài giây</p>
              </div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className={`text-xs mt-1 block text-right ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white text-gray-800 rounded-lg rounded-bl-none p-3 max-w-[80%] shadow-sm border border-gray-100">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <p className="text-xs bg-gray-100 py-1 px-2 rounded-full font-medium text-blue-600 mt-2 text-center">
              Được hỗ trợ bởi trí tuệ nhân tạo SME Crowdfund
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
