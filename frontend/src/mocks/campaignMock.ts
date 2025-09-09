import { Campaign } from '../types';

// Data URL placeholder images that always work
const placeholderImages = {
  techlink: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjU2M2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5UZWNoTGluayBBSTwvdGV4dD48L3N2Zz4=',
  greenfarm: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTZhMzRhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5HcmVlbiBGYXJtPC90ZXh0Pjwvc3ZnPg==',
  smarthealth: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGMyNjI2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TbWFydCBIZWFsdGg8L3RleHQ+PC9zdmc+'
};

// Mock campaigns for development
export const mockCampaigns: Campaign[] = [
  {
    id: 1,
    title: 'TechLink AI - Nền tảng hỗ trợ khách hàng',
    summary: 'Hệ thống AI tiên tiến hỗ trợ doanh nghiệp tự động hóa chăm sóc khách hàng với công nghệ tiên tiến',
    description: `
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-blue-700 mb-4">Giới thiệu về TechLink AI</h2>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-2/3">
            <p class="mb-4">Công ty Cổ phần TechLink AI là startup công nghệ hàng đầu Việt Nam, được thành lập năm 2023 bởi đội ngũ kỹ sư và chuyên gia AI đến từ các công ty công nghệ hàng đầu thế giới. Chúng tôi phát triển nền tảng trí tuệ nhân tạo tiên tiến nhằm giúp doanh nghiệp vừa và nhỏ tự động hóa quy trình chăm sóc khách hàng.</p>
            
            <p class="mb-4">Với vốn điều lệ 10 tỷ đồng, chúng tôi đã huy động thành công 2 triệu USD từ các quỹ đầu tư mạo hiểm trong và ngoài nước như Vietnam Silicon Valley Accelerator, 500 Startups Vietnam và một số nhà đầu tư thiên thần. Sản phẩm TechLink AI hiện đang được 20+ doanh nghiệp SME tại Việt Nam sử dụng và đạt tỷ lệ hài lòng 95%.</p>

            <p>Mã số doanh nghiệp: 0106789456<br />
            Địa chỉ: Tầng 15, Tòa nhà Keangnam Landmark, Phạm Hùng, Nam Từ Liêm, Hà Nội<br />
            Website: techlink.ai | Email: contact@techlink.ai</p>
          </div>
          <div class="md:w-1/3">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 class="font-bold text-blue-800 mb-2">Thành tựu nổi bật</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>TOP 5 AI Startup Việt Nam 2024</li>
                <li>Giải nhất cuộc thi Vietnam AI Grand Challenge</li>
                <li>Thành viên của Vietnam AI Alliance</li>
                <li>Được vinh danh tại Forbes 30 Under 30 Asia</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold text-blue-700 mb-4">Vấn đề chúng tôi giải quyết</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-lg border-l-4 border-red-400">
            <h3 class="font-bold text-xl mb-3 text-red-700">Thách thức hiện tại</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>SME tại Việt Nam chi 30-40% chi phí vận hành cho nhân sự chăm sóc khách hàng</li>
              <li>Chất lượng dịch vụ không đồng đều do biến động nhân sự cao (35-40%/năm)</li>
              <li>69% khách hàng không hài lòng khi phải chờ đợi phản hồi quá 5 phút</li>
              <li>91% khách hàng sẽ không quay lại sau một trải nghiệm tiêu cực</li>
            </ul>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border-l-4 border-blue-400">
            <h3 class="font-bold text-xl mb-3 text-blue-700">Cơ hội thị trường</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Thị trường AI cho doanh nghiệp Việt Nam đạt 50 triệu USD (2024) và tăng trưởng 35%/năm</li>
              <li>8,8 triệu doanh nghiệp vừa và nhỏ tại Đông Nam Á cần giải pháp tự động hóa</li>
              <li>Chi phí đầu tư AI giảm 60% trong 3 năm qua nhờ mô hình mở và điện toán đám mây</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold text-blue-700 mb-4">Giải pháp của chúng tôi</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-white p-6 rounded-lg shadow-md border border-blue-100">
            <div class="flex items-center mb-4">
              <div class="bg-blue-100 rounded-full p-3 mr-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold">NLP Chatbot thông minh</h3>
            </div>
            <p class="text-gray-600 mb-4">Chatbot tích hợp công nghệ xử lý ngôn ngữ tự nhiên (NLP) tiên tiến dựa trên mô hình ngôn ngữ lớn (LLM), được huấn luyện đặc biệt cho tiếng Việt với độ chính xác 96,7%.</p>
            <div class="text-sm text-blue-600 font-medium flex items-center">
              <span>Giảm 78% thời gian phản hồi</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md border border-blue-100">
            <div class="flex items-center mb-4">
              <div class="bg-blue-100 rounded-full p-3 mr-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold">Phân tích cảm xúc khách hàng</h3>
            </div>
            <p class="text-gray-600 mb-4">Sử dụng AI để phân tích cảm xúc khách hàng từ tin nhắn văn bản và cuộc gọi, giúp doanh nghiệp đo lường mức độ hài lòng và can thiệp kịp thời khi cần.</p>
            <div class="text-sm text-blue-600 font-medium flex items-center">
              <span>Tăng 42% tỷ lệ hài lòng</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md border border-blue-100">
            <div class="flex items-center mb-4">
              <div class="bg-blue-100 rounded-full p-3 mr-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold">Phân loại và chuyển tiếp thông minh</h3>
            </div>
            <p class="text-gray-600 mb-4">AI tự động phân loại yêu cầu khách hàng theo mức độ ưu tiên và chuyển đến đúng bộ phận phù hợp, giúp giảm thời gian xử lý và tăng tỷ lệ giải quyết ngay lần đầu.</p>
            <div class="text-sm text-blue-600 font-medium flex items-center">
              <span>Tăng 63% hiệu suất xử lý</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md border border-blue-100">
            <div class="flex items-center mb-4">
              <div class="bg-blue-100 rounded-full p-3 mr-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold">Báo cáo phân tích nâng cao</h3>
            </div>
            <p class="text-gray-600 mb-4">Hệ thống báo cáo với AI phân tích dữ liệu lớn, cung cấp insight về hành vi khách hàng và gợi ý cải thiện quy trình, giúp doanh nghiệp ra quyết định dựa trên dữ liệu.</p>
            <div class="text-sm text-blue-600 font-medium flex items-center">
              <span>Tối ưu 35% chi phí vận hành</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-blue-700 mb-4">Công nghệ độc quyền</h2>
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 mb-6">
          <h3 class="font-bold text-lg mb-4 text-blue-800">Nền tảng TechLink AI được xây dựng trên 3 công nghệ cốt lõi:</h3>
          
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="bg-blue-100 rounded-full p-2 mr-3 mt-1">
                <svg class="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-blue-900">VietnameseGPT</h4>
                <p class="text-sm text-gray-700">Mô hình ngôn ngữ dạng LLM được huấn luyện đặc biệt cho tiếng Việt trên bộ dữ liệu 250GB văn bản, đạt điểm BLEU cao hơn 28% so với các giải pháp quốc tế.</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-blue-100 rounded-full p-2 mr-3 mt-1">
                <svg class="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-blue-900">EmotionX</h4>
                <p class="text-sm text-gray-700">Thuật toán độc quyền phân tích cảm xúc đa chiều (7 loại cảm xúc) từ văn bản và giọng nói tiếng Việt với độ chính xác 93,8%, vượt trội so với các giải pháp hiện có trên thị trường.</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-blue-100 rounded-full p-2 mr-3 mt-1">
                <svg class="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-blue-900">AutoInsight</h4>
                <p class="text-sm text-gray-700">Hệ thống AI phân tích dữ liệu tự động với khả năng phát hiện xu hướng và đề xuất cải tiến quy trình, giúp doanh nghiệp tối ưu hóa hoạt động chăm sóc khách hàng.</p>
              </div>
            </div>
          </div>
          
          <div class="mt-6 bg-blue-100 p-3 rounded-lg">
            <p class="text-sm text-blue-800"><strong>Bảo mật cao cấp:</strong> Toàn bộ dữ liệu được mã hóa end-to-end và lưu trữ tại Việt Nam, đáp ứng các tiêu chuẩn bảo mật ISO 27001 và tuân thủ Luật Bảo vệ dữ liệu cá nhân Việt Nam.</p>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold text-blue-700 mb-4">Tình hình kinh doanh hiện tại</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse border border-blue-200 mb-4">
            <thead>
              <tr class="bg-blue-100">
                <th class="border border-blue-200 px-4 py-2 text-left">Chỉ tiêu</th>
                <th class="border border-blue-200 px-4 py-2 text-right">2023</th>
                <th class="border border-blue-200 px-4 py-2 text-right">2024</th>
                <th class="border border-blue-200 px-4 py-2 text-right">2025 (Dự kiến)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-blue-200 px-4 py-2">Doanh thu (tỷ đồng)</td>
                <td class="border border-blue-200 px-4 py-2 text-right">2.8</td>
                <td class="border border-blue-200 px-4 py-2 text-right">14.5</td>
                <td class="border border-blue-200 px-4 py-2 text-right">45.0</td>
              </tr>
              <tr class="bg-blue-50">
                <td class="border border-blue-200 px-4 py-2">EBITDA (tỷ đồng)</td>
                <td class="border border-blue-200 px-4 py-2 text-right">-1.2</td>
                <td class="border border-blue-200 px-4 py-2 text-right">3.6</td>
                <td class="border border-blue-200 px-4 py-2 text-right">16.2</td>
              </tr>
              <tr>
                <td class="border border-blue-200 px-4 py-2">Số khách hàng doanh nghiệp</td>
                <td class="border border-blue-200 px-4 py-2 text-right">8</td>
                <td class="border border-blue-200 px-4 py-2 text-right">28</td>
                <td class="border border-blue-200 px-4 py-2 text-right">120</td>
              </tr>
              <tr class="bg-blue-50">
                <td class="border border-blue-200 px-4 py-2">ARR (tỷ đồng)</td>
                <td class="border border-blue-200 px-4 py-2 text-right">3.2</td>
                <td class="border border-blue-200 px-4 py-2 text-right">18.6</td>
                <td class="border border-blue-200 px-4 py-2 text-right">60.0</td>
              </tr>
              <tr>
                <td class="border border-blue-200 px-4 py-2">Nhân viên</td>
                <td class="border border-blue-200 px-4 py-2 text-right">12</td>
                <td class="border border-blue-200 px-4 py-2 text-right">35</td>
                <td class="border border-blue-200 px-4 py-2 text-right">85</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <h3 class="font-bold text-lg text-yellow-800">Cơ hội mở rộng</h3>
          <p>Với tăng trưởng 415% trong năm 2024, chúng tôi đang có 150+ khách hàng tiềm năng trong hàng chờ. Đợt gọi vốn này sẽ giúp chúng tôi đẩy nhanh phát triển sản phẩm và mở rộng đội ngũ để đáp ứng nhu cầu thị trường đang tăng cao.</p>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-blue-700 mb-4">Mục đích gọi vốn</h2>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-2/3">
            <p class="mb-4">Số tiền huy động thành công 500 triệu đồng sẽ được phân bổ như sau:</p>
            <div class="relative pt-1 mb-6">
              <div class="mb-2 flex justify-between">
                <span class="font-medium text-blue-700">Phát triển tính năng và cải thiện thuật toán AI (45%) - 225 triệu đồng</span>
                <span class="text-blue-700 font-semibold">45%</span>
              </div>
              <div class="overflow-hidden h-4 text-xs flex rounded-full bg-blue-100">
                <div style="width: 45%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
              </div>
            </div>
            
            <div class="relative pt-1 mb-6">
              <div class="mb-2 flex justify-between">
                <span class="font-medium text-blue-700">Mở rộng đội ngũ kỹ thuật và kinh doanh (30%) - 150 triệu đồng</span>
                <span class="text-blue-700 font-semibold">30%</span>
              </div>
              <div class="overflow-hidden h-4 text-xs flex rounded-full bg-blue-100">
                <div style="width: 30%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
              </div>
            </div>
            
            <div class="relative pt-1 mb-6">
              <div class="mb-2 flex justify-between">
                <span class="font-medium text-blue-700">Marketing và phát triển thị trường (25%) - 125 triệu đồng</span>
                <span class="text-blue-700 font-semibold">25%</span>
              </div>
              <div class="overflow-hidden h-4 text-xs flex rounded-full bg-blue-100">
                <div style="width: 25%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
              </div>
            </div>
          </div>
          <div class="md:w-1/3">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 class="font-bold text-blue-800 mb-2">Điều khoản đầu tư</h4>
              <ul class="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Loại hình:</strong> Cổ phần ưu đãi</li>
                <li><strong>Định giá pre-money:</strong> 45 tỷ đồng</li>
                <li><strong>Tỷ lệ sở hữu:</strong> 1,1% / 500 triệu đồng</li>
                <li><strong>Quyền ưu tiên:</strong> 1,2x liquidation preference</li>
                <li><strong>Lộ trình thoái vốn:</strong> 3-5 năm (IPO hoặc M&A)</li>
                <li><strong>ROI dự kiến:</strong> 5-8x trong vòng 4-5 năm</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-blue-700 mb-4">Lộ trình phát triển</h2>
        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>
          
          <!-- Timeline items -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <!-- Q4 2025 -->
            <div class="md:col-start-2 relative">
              <div class="absolute left-8 md:-left-4 top-5 w-8 h-8 rounded-full bg-blue-500 border-4 border-white shadow transform -translate-x-1/2 flex items-center justify-center">
                <span class="text-white font-bold text-sm">1</span>
              </div>
              <div class="ml-12 md:ml-0 bg-white p-4 rounded-lg shadow border border-blue-100">
                <h3 class="font-bold text-blue-800">Q4/2025</h3>
                <p>Ra mắt TechLink AI 2.0 với khả năng phân tích giọng nói và xử lý đa ngôn ngữ (Việt, Anh, Trung, Hàn, Nhật)</p>
              </div>
            </div>
            
            <!-- Empty space for left column -->
            <div class="hidden md:block"></div>
            
            <!-- Q1 2026 -->
            <div class="relative">
              <div class="absolute left-8 md:-right-4 top-5 w-8 h-8 rounded-full bg-blue-500 border-4 border-white shadow transform md:translate-x-1/2 -translate-x-1/2 flex items-center justify-center">
                <span class="text-white font-bold text-sm">2</span>
              </div>
              <div class="ml-12 md:ml-0 bg-white p-4 rounded-lg shadow border border-blue-100">
                <h3 class="font-bold text-blue-800">Q1/2026</h3>
                <p>Mở rộng sang thị trường Singapore và Thái Lan, hợp tác với 5 đối tác phân phối khu vực</p>
              </div>
            </div>
            
            <!-- Q3 2026 -->
            <div class="md:col-start-2 relative">
              <div class="absolute left-8 md:-left-4 top-5 w-8 h-8 rounded-full bg-blue-500 border-4 border-white shadow transform -translate-x-1/2 flex items-center justify-center">
                <span class="text-white font-bold text-sm">3</span>
              </div>
              <div class="ml-12 md:ml-0 bg-white p-4 rounded-lg shadow border border-blue-100">
                <h3 class="font-bold text-blue-800">Q3/2026</h3>
                <p>Huy động vòng Series A với mục tiêu 5 triệu USD để đẩy mạnh tốc độ mở rộng thị trường Đông Nam Á</p>
              </div>
            </div>
            
            <!-- Empty space for left column -->
            <div class="hidden md:block"></div>
            
            <!-- Q4 2026 -->
            <div class="relative">
              <div class="absolute left-8 md:-right-4 top-5 w-8 h-8 rounded-full bg-blue-500 border-4 border-white shadow transform md:translate-x-1/2 -translate-x-1/2 flex items-center justify-center">
                <span class="text-white font-bold text-sm">4</span>
              </div>
              <div class="ml-12 md:ml-0 bg-white p-4 rounded-lg shadow border border-blue-100">
                <h3 class="font-bold text-blue-800">Q4/2026</h3>
                <p>Đạt mốc 500 doanh nghiệp sử dụng và đi vào lợi nhuận ổn định với biên lợi nhuận 35%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-blue-700 mb-4">Đội ngũ sáng lập</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-center">
            <div class="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
              <span class="text-blue-800 font-bold text-xl">NMT</span>
            </div>
            <h4 class="font-bold text-lg">Nguyễn Minh Tuấn</h4>
            <p class="text-sm text-gray-600 mb-2">CEO & Co-founder</p>
            <p class="text-sm">Cựu Giám đốc Công nghệ tại Tech Solutions với hơn 15 năm kinh nghiệm. MBA từ Đại học INSEAD và từng là kỹ sư phần mềm tại Google.</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-center">
            <div class="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
              <span class="text-blue-800 font-bold text-xl">THN</span>
            </div>
            <h4 class="font-bold text-lg">TS. Trần Hoài Nam</h4>
            <p class="text-sm text-gray-600 mb-2">CTO & Co-founder</p>
            <p class="text-sm">Tiến sĩ AI từ Đại học Stanford, chuyên gia về máy học và xử lý ngôn ngữ tự nhiên với 8 bài báo khoa học và 3 bằng sáng chế trong lĩnh vực NLP.</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-center">
            <div class="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
              <span class="text-blue-800 font-bold text-xl">LTP</span>
            </div>
            <h4 class="font-bold text-lg">Lê Thị Phương</h4>
            <p class="text-sm text-gray-600 mb-2">CMO & Co-founder</p>
            <p class="text-sm">Hơn 10 năm kinh nghiệm marketing B2B tại Microsoft Việt Nam và Salesforce Singapore. Thạc sĩ Marketing từ Đại học Melbourne, Australia.</p>
          </div>
        </div>
      </div>
    `,
    target: 500000000,
    raised: 250000000,
    status: 'active',
    ownerId: 1,
    imageUrl: placeholderImages.techlink,
    createdAt: '2025-08-25T09:00:00Z',
    endDate: new Date('2025-09-18T09:00:00Z'),
    industry: 'Công nghệ',
    type: 'equity',
    riskLevel: 'medium',
    investors: 102,
    rating: 4.8,
    location: 'Hà Nội',
    teamMembers: [
      {
        name: 'Nguyễn Minh Tuấn',
        role: 'CEO',
        bio: 'Cựu Giám đốc Công nghệ tại Tech Solutions với hơn 15 năm kinh nghiệm',
        linkedIn: 'linkedin.com/in/nguyenminhtuan'
      },
      {
        name: 'Trần Hoài Nam',
        role: 'CTO',
        bio: 'Tiến sĩ AI từ Đại học Stanford, chuyên gia về máy học và xử lý ngôn ngữ tự nhiên',
        linkedIn: 'linkedin.com/in/tranhoainam'
      }
    ]
  },
  {
    id: 2,
    title: 'Nông Sản Xanh - Mở rộng vùng trồng hữu cơ',
    summary: 'Dự án mở rộng diện tích và quy mô canh tác nông nghiệp hữu cơ, đáp ứng nhu cầu thị trường trong nước và xuất khẩu',
    description: `
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-green-700 mb-4">Về Nông Sản Xanh</h2>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-2/3">
            <p class="mb-4">Công ty TNHH Nông Sản Xanh là doanh nghiệp tiên phong trong lĩnh vực sản xuất và phân phối nông sản hữu cơ tại Việt Nam. Được thành lập vào năm 2020 bởi KS. Phạm Văn Đức cùng đội ngũ kỹ sư nông nghiệp giàu kinh nghiệm, chúng tôi đã xây dựng được vùng trồng hữu cơ đạt chuẩn quốc tế với diện tích 15 hecta tại Lâm Đồng.</p>
            
            <p class="mb-4">Với vốn điều lệ 5 tỷ đồng và doanh thu năm 2024 đạt 12 tỷ đồng, chúng tôi đang cung cấp 12 loại nông sản hữu cơ được cấp chứng nhận USDA Organic (Hoa Kỳ) và EU Organic (Châu Âu) đến hơn 50 chuỗi siêu thị và cửa hàng thực phẩm sạch trên toàn quốc.</p>

            <p>Mã số doanh nghiệp: 5800256789<br />
            Địa chỉ trụ sở: Xã Xuân Thọ, TP. Đà Lạt, Tỉnh Lâm Đồng<br />
            Liên hệ: contact@nongsanxanh.vn | 0263.3822.456</p>
          </div>
          <div class="md:w-1/3">
            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 class="font-bold text-green-800 mb-2">Thành tựu nổi bật</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>Top 10 Doanh nghiệp Nông nghiệp Xanh 2024</li>
                <li>Chứng nhận hữu cơ USDA và EU Organic</li>
                <li>Giải thưởng Sáng kiến Xanh Việt Nam 2023</li>
                <li>Đối tác chiến lược của Vinmart, BRG Retail</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold text-green-700 mb-4">Tầm nhìn & Sứ mệnh</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border-l-4 border-green-500">
            <h3 class="font-bold text-xl mb-3 text-green-800">Tầm nhìn</h3>
            <p>Chúng tôi mong muốn trở thành doanh nghiệp hàng đầu cung cấp nông sản hữu cơ chất lượng cao tại Việt Nam và khu vực Đông Nam Á, đồng thời là hình mẫu cho mô hình nông nghiệp bền vững và có trách nhiệm.</p>
          </div>
          <div class="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border-l-4 border-green-500">
            <h3 class="font-bold text-xl mb-3 text-green-800">Sứ mệnh</h3>
            <p>Xây dựng hệ sinh thái nông nghiệp hữu cơ bền vững, mang lại giá trị cho nông dân, người tiêu dùng và môi trường thông qua quy trình canh tác và chế biến đảm bảo an toàn tuyệt đối.</p>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold text-green-700 mb-4">Tình hình kinh doanh hiện tại</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse border border-green-200 mb-4">
            <thead>
              <tr class="bg-green-100">
                <th class="border border-green-200 px-4 py-2 text-left">Chỉ tiêu</th>
                <th class="border border-green-200 px-4 py-2 text-right">2023</th>
                <th class="border border-green-200 px-4 py-2 text-right">2024</th>
                <th class="border border-green-200 px-4 py-2 text-right">2025 (Dự kiến)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-green-200 px-4 py-2">Doanh thu (tỷ đồng)</td>
                <td class="border border-green-200 px-4 py-2 text-right">8.2</td>
                <td class="border border-green-200 px-4 py-2 text-right">12.0</td>
                <td class="border border-green-200 px-4 py-2 text-right">36.0</td>
              </tr>
              <tr class="bg-green-50">
                <td class="border border-green-200 px-4 py-2">Lợi nhuận sau thuế (tỷ đồng)</td>
                <td class="border border-green-200 px-4 py-2 text-right">0.9</td>
                <td class="border border-green-200 px-4 py-2 text-right">1.8</td>
                <td class="border border-green-200 px-4 py-2 text-right">6.5</td>
              </tr>
              <tr>
                <td class="border border-green-200 px-4 py-2">Diện tích canh tác (hecta)</td>
                <td class="border border-green-200 px-4 py-2 text-right">10</td>
                <td class="border border-green-200 px-4 py-2 text-right">15</td>
                <td class="border border-green-200 px-4 py-2 text-right">25</td>
              </tr>
              <tr class="bg-green-50">
                <td class="border border-green-200 px-4 py-2">Số lượng sản phẩm</td>
                <td class="border border-green-200 px-4 py-2 text-right">8</td>
                <td class="border border-green-200 px-4 py-2 text-right">12</td>
                <td class="border border-green-200 px-4 py-2 text-right">20</td>
              </tr>
              <tr>
                <td class="border border-green-200 px-4 py-2">Nhân viên</td>
                <td class="border border-green-200 px-4 py-2 text-right">28</td>
                <td class="border border-green-200 px-4 py-2 text-right">42</td>
                <td class="border border-green-200 px-4 py-2 text-right">92</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <h3 class="font-bold text-lg text-yellow-800">Thách thức hiện tại</h3>
          <p>Với sự tăng trưởng của thị trường thực phẩm hữu cơ trong nước (30%/năm) và nhu cầu xuất khẩu từ các đối tác Nhật Bản, Singapore, chúng tôi đang không đáp ứng đủ công suất. Hiện chúng tôi chỉ có thể đáp ứng 60% nhu cầu đơn hàng do hạn chế về diện tích canh tác và công nghệ chế biến.</p>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold text-green-700 mb-4">Dự án mở rộng</h2>
        <p class="mb-4">Với nhu cầu ngày càng tăng từ thị trường trong nước và quốc tế, chúng tôi đặt mục tiêu mở rộng quy mô hoạt động và nâng cao chất lượng sản phẩm thông qua:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-white p-4 rounded-lg shadow-md border border-green-100">
            <div class="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
              <span class="text-green-700 font-bold text-xl">1</span>
            </div>
            <h4 class="font-bold mb-2">Mở rộng vùng trồng</h4>
            <p>Thuê thêm 10 hecta đất canh tác tại Lâm Đồng và chuyển đổi sang mô hình canh tác hữu cơ đạt chuẩn quốc tế</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-md border border-green-100">
            <div class="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
              <span class="text-green-700 font-bold text-xl">2</span>
            </div>
            <h4 class="font-bold mb-2">Đầu tư công nghệ</h4>
            <p>Mua sắm thiết bị nông nghiệp hiện đại và xây dựng hệ thống tưới tiêu tự động tiết kiệm nước</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-md border border-green-100">
            <div class="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
              <span class="text-green-700 font-bold text-xl">3</span>
            </div>
            <h4 class="font-bold mb-2">Nhà máy chế biến</h4>
            <p>Xây dựng nhà máy chế biến và đóng gói hiện đại với công suất 2 tấn/ngày</p>
          </div>
        </div>

        <div class="bg-green-50 p-5 rounded-lg border border-green-200 mb-6">
          <h3 class="font-bold text-lg mb-3">Đối tác chiến lược</h3>
          <p class="mb-3">Chúng tôi đã ký kết thỏa thuận hợp tác với:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Chuỗi siêu thị WinMart</strong> - Cam kết phân phối sản phẩm trên toàn hệ thống 100 cửa hàng</li>
            <li><strong>Tập đoàn BRG</strong> - Phân phối độc quyền tại chuỗi BRG Mart với đơn hàng tối thiểu 500kg/tuần</li>
            <li><strong>Hiệp hội Nông sản Sạch Nhật Bản</strong> - Xuất khẩu rau củ hữu cơ sang thị trường Nhật Bản từ Q2/2026</li>
            <li><strong>Sở NN&PTNT tỉnh Lâm Đồng</strong> - Hỗ trợ kỹ thuật và chứng nhận hữu cơ cho các hộ nông dân liên kết</li>
          </ul>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-green-700 mb-4">Kế hoạch sử dụng vốn</h2>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-2/3">
            <p class="mb-4">Số tiền huy động thành công 200 triệu đồng sẽ được phân bổ như sau:</p>
            <div class="relative pt-1 mb-6">
              <div class="mb-2 flex justify-between">
                <span class="font-medium text-green-700">Thuê và cải tạo đất (40%) - 80 triệu đồng</span>
                <span class="text-green-700 font-semibold">40%</span>
              </div>
              <div class="overflow-hidden h-4 text-xs flex rounded-full bg-green-100">
                <div style="width: 40%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>
              </div>
            </div>
            
            <div class="relative pt-1 mb-6">
              <div class="mb-2 flex justify-between">
                <span class="font-medium text-green-700">Thiết bị nông nghiệp hiện đại (25%) - 50 triệu đồng</span>
                <span class="text-green-700 font-semibold">25%</span>
              </div>
              <div class="overflow-hidden h-4 text-xs flex rounded-full bg-green-100">
                <div style="width: 25%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>
              </div>
            </div>
            
            <div class="relative pt-1 mb-6">
              <div class="mb-2 flex justify-between">
                <span class="font-medium text-green-700">Nhà máy chế biến và đóng gói (25%) - 50 triệu đồng</span>
                <span class="text-green-700 font-semibold">25%</span>
              </div>
              <div class="overflow-hidden h-4 text-xs flex rounded-full bg-green-100">
                <div style="width: 25%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>
              </div>
            </div>
            
            <div class="relative pt-1 mb-6">
              <div class="mb-2 flex justify-between">
                <span class="font-medium text-green-700">Chi phí vận hành và marketing (10%) - 20 triệu đồng</span>
                <span class="text-green-700 font-semibold">10%</span>
              </div>
              <div class="overflow-hidden h-4 text-xs flex rounded-full bg-green-100">
                <div style="width: 10%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>
              </div>
            </div>
          </div>
          <div class="md:w-1/3">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 class="font-bold text-blue-800 mb-2">Điều khoản đầu tư</h4>
              <ul class="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Loại hình:</strong> Trái phiếu doanh nghiệp</li>
                <li><strong>Kỳ hạn:</strong> 24 tháng</li>
                <li><strong>Lãi suất:</strong> 12%/năm</li>
                <li><strong>Thanh toán lãi:</strong> 6 tháng/lần</li>
                <li><strong>Đảm bảo:</strong> Tài sản dự án và bảo lãnh cá nhân từ Giám đốc</li>
                <li><strong>Rủi ro:</strong> Thấp (có đánh giá từ đơn vị thẩm định độc lập)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-green-700 mb-4">Hiệu quả kinh tế</h2>
        <div class="bg-white p-5 rounded-lg border border-gray-200 mb-6">
          <p class="mb-4">Dự án dự kiến sẽ mang lại hiệu quả kinh tế rõ rệt trong vòng 24 tháng tới:</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-green-50 p-4 rounded-lg text-center">
              <h4 class="font-bold text-green-800">Tăng công suất</h4>
              <p class="text-3xl font-bold text-green-600 my-2">+150%</p>
              <p class="text-sm">Từ 1.2 tấn/ngày lên 3 tấn/ngày</p>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg text-center">
              <h4 class="font-bold text-green-800">Mở rộng danh mục</h4>
              <p class="text-3xl font-bold text-green-600 my-2">12 → 20</p>
              <p class="text-sm">Loại nông sản hữu cơ</p>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg text-center">
              <h4 class="font-bold text-green-800">Tăng doanh thu</h4>
              <p class="text-3xl font-bold text-green-600 my-2">+200%</p>
              <p class="text-sm">Đạt 36 tỷ đồng vào năm 2025</p>
            </div>
          </div>
          
          <div class="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 class="font-bold text-blue-800 mb-2">Điểm hòa vốn và ROI</h4>
            <p>Dự án dự kiến sẽ đạt điểm hòa vốn sau <strong>18 tháng</strong> và mang lại tỷ suất lợi nhuận đầu tư (ROI) ước tính <strong>28%</strong> sau 2 năm.</p>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold text-green-700 mb-4">Tác động xã hội và môi trường</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-bold text-lg mb-3">Tác động xã hội</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Tạo thêm việc làm cho <strong>50 lao động địa phương</strong> với mức lương cao hơn 20% so với mức trung bình trong ngành</li>
              <li>Hỗ trợ kỹ thuật và bao tiêu sản phẩm cho <strong>20 hộ nông dân</strong> chuyển đổi sang mô hình canh tác hữu cơ bền vững</li>
              <li>Đóng góp 5% lợi nhuận hàng năm cho Quỹ Học bổng Sinh viên Nông nghiệp</li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold text-lg mb-3">Tác động môi trường</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Giảm 100% sử dụng phân bón hóa học và thuốc trừ sâu</li>
              <li>Tiết kiệm 40% lượng nước sử dụng nhờ hệ thống tưới tiêu thông minh</li>
              <li>Sử dụng 100% bao bì tái chế hoặc phân hủy sinh học</li>
              <li>Giảm 30% khí thải CO2 so với phương pháp canh tác truyền thống</li>
            </ul>
          </div>
        </div>
        
        <div class="bg-green-50 p-4 rounded-lg mt-6 border-l-4 border-green-500">
          <h3 class="font-bold text-lg text-green-800 mb-2">Cam kết của chúng tôi</h3>
          <p>"Chúng tôi không chỉ cung cấp thực phẩm hữu cơ chất lượng cao mà còn cam kết xây dựng một hệ sinh thái nông nghiệp bền vững, mang lại lợi ích lâu dài cho cộng đồng nông dân, người tiêu dùng và môi trường. Mỗi đồng vốn đầu tư vào Nông Sản Xanh không chỉ là đầu tư vào một doanh nghiệp mà còn là đóng góp cho tương lai bền vững của nông nghiệp Việt Nam."</p>
          <p class="mt-2 font-semibold text-right">- KS. Phạm Văn Đức, Giám đốc điều hành</p>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-green-700 mb-4">Đội ngũ lãnh đạo</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-center">
            <div class="w-24 h-24 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
              <span class="text-green-800 font-bold text-xl">PVĐ</span>
            </div>
            <h4 class="font-bold text-lg">KS. Phạm Văn Đức</h4>
            <p class="text-sm text-gray-600 mb-2">Giám đốc điều hành & Nhà sáng lập</p>
            <p class="text-sm">Kỹ sư nông nghiệp với 20 năm kinh nghiệm trong canh tác hữu cơ. Tốt nghiệp Đại học Nông Lâm TP.HCM và từng làm việc tại Vineco.</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-center">
            <div class="w-24 h-24 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
              <span class="text-green-800 font-bold text-xl">NTH</span>
            </div>
            <h4 class="font-bold text-lg">TS. Nguyễn Thị Hoa</h4>
            <p class="text-sm text-gray-600 mb-2">Giám đốc Kỹ thuật</p>
            <p class="text-sm">Tiến sĩ Khoa học Đất tại ĐH Kyoto (Nhật Bản). 15 năm kinh nghiệm nghiên cứu và phát triển kỹ thuật canh tác hữu cơ.</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-center">
            <div class="w-24 h-24 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
              <span class="text-green-800 font-bold text-xl">TVM</span>
            </div>
            <h4 class="font-bold text-lg">MBA. Trần Văn Minh</h4>
            <p class="text-sm text-gray-600 mb-2">Giám đốc Tài chính</p>
            <p class="text-sm">Thạc sĩ Quản trị Kinh doanh tại ĐH Kinh tế TP.HCM. 12 năm kinh nghiệm trong quản lý tài chính và kêu gọi vốn.</p>
          </div>
        </div>
      </div>
    `,
    target: 200000000,
    raised: 150000000,
    status: 'active',
    ownerId: 2,
    imageUrl: placeholderImages.greenfarm,
    createdAt: '2025-09-01T10:30:00Z',
    endDate: new Date('2025-09-11T10:30:00Z'),
    industry: 'Nông nghiệp',
    type: 'debt',
    riskLevel: 'low',
    investors: 85,
    rating: 4.6,
    location: 'Lâm Đồng',
    teamMembers: [
      {
        name: 'Phạm Văn Đức',
        role: 'Giám đốc điều hành',
        bio: 'Kỹ sư nông nghiệp với 20 năm kinh nghiệm trong canh tác hữu cơ',
        linkedIn: 'linkedin.com/in/phamvanduc'
      }
    ]
  },
  {
    id: 3,
    title: 'MediConnect - Ứng dụng kết nối y tế thông minh',
    summary: 'Nền tảng kết nối bệnh nhân với bác sĩ và cơ sở y tế một cách nhanh chóng, thuận tiện thông qua công nghệ AI và Big Data',
    description: `
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-purple-700 mb-4">Giới thiệu về MediConnect</h2>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-2/3">
            <p class="mb-4">Công ty Cổ phần Công nghệ Y tế MediConnect là đơn vị tiên phong trong việc ứng dụng trí tuệ nhân tạo vào lĩnh vực y tế tại Việt Nam. Thành lập từ năm 2022 bởi TS. Hoàng Minh Trí – bác sĩ với hơn 10 năm kinh nghiệm và chuyên gia công nghệ y tế, MediConnect đã phát triển nền tảng kết nối y tế thông minh nhằm giải quyết các vấn đề trong hệ thống chăm sóc sức khỏe tại Việt Nam.</p>
            
            <p class="mb-4">Chúng tôi đã huy động thành công 1,5 triệu USD từ các nhà đầu tư Vingroup Ventures, VinaCapital Ventures và Singapore Medical Group. Hiện nền tảng đã có hơn 250.000 người dùng và hợp tác với 15 bệnh viện, 300 phòng khám tại 3 thành phố lớn.</p>

            <p>Mã số doanh nghiệp: 0312456789<br />
            Địa chỉ: Số 25 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh<br />
            Website: mediconnect.vn | Email: info@mediconnect.vn</p>
          </div>
          <div class="md:w-1/3">
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 class="font-bold text-purple-800 mb-2">Thành tựu nổi bật</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>Startup Y tế xuất sắc nhất 2024 - Tech in Asia</li>
                <li>Top 3 Ứng dụng Y tế tại Vietnam Digital Awards</li>
                <li>Chứng nhận ISO 27001 về An toàn thông tin</li>
                <li>Giải pháp Y tế Số xuất sắc - Bộ Y tế Việt Nam</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold text-purple-700 mb-4">Thách thức trong hệ thống y tế</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
            <h3 class="font-bold text-lg text-red-700 mb-2">Quá tải hệ thống</h3>
            <p class="text-sm">Bệnh viện tuyến trên quá tải với 120-150% công suất, thời gian chờ đợi trung bình 3-5 giờ cho mỗi lần khám.</p>
          </div>
          <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
            <h3 class="font-bold text-lg text-red-700 mb-2">Phân bố không đều</h3>
            <p class="text-sm">56% bác sĩ chuyên khoa tập trung tại thành phố lớn, trong khi 65% dân số sống ở khu vực nông thôn.</p>
          </div>
          <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
            <h3 class="font-bold text-lg text-red-700 mb-2">Thiếu thông tin</h3>
            <p class="text-sm">78% bệnh nhân không biết nên khám chuyên khoa nào khi có triệu chứng, dẫn đến việc khám không đúng chuyên khoa.</p>
          </div>
        </div>
        
        <div class="bg-purple-50 p-5 rounded-lg border border-purple-200 mb-6">
          <h3 class="font-bold text-purple-700 mb-3">Cơ hội thị trường</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <ul class="list-disc pl-5 space-y-2">
                <li>Thị trường y tế điện tử Việt Nam đạt 350 triệu USD (2024) với tốc độ tăng trưởng 27%/năm</li>
                <li>96% người Việt sở hữu điện thoại thông minh và 82% có kết nối internet</li>
                <li>Chi tiêu cho y tế tăng trung bình 10,8%/năm, cao hơn tốc độ tăng GDP</li>
              </ul>
            </div>
            <div>
              <ul class="list-disc pl-5 space-y-2">
                <li>Tỷ lệ bác sĩ/dân số thấp: 8,6 bác sĩ/10.000 dân (so với mức trung bình 33/10.000 của OECD)</li>
                <li>Chính phủ đang đẩy mạnh chuyển đổi số y tế với ngân sách 400 tỷ đồng/năm</li>
                <li>COVID-19 đã thúc đẩy nhu cầu tư vấn sức khỏe từ xa tăng 350%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold text-purple-700 mb-4">Giải pháp MediConnect</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-white p-4 rounded-lg shadow border border-purple-100 hover:shadow-lg transition-shadow">
            <div class="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="font-bold text-purple-700 mb-2">Đặt lịch khám thông minh</h3>
            <p class="text-sm text-gray-600">AI phân tích triệu chứng và định hướng đến đúng bác sĩ chuyên khoa phù hợp, giảm 65% tỷ lệ khám không đúng chuyên khoa.</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow border border-purple-100 hover:shadow-lg transition-shadow">
            <div class="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="font-bold text-purple-700 mb-2">Tư vấn sức khỏe từ xa</h3>
            <p class="text-sm text-gray-600">Video call 24/7 với bác sĩ được hỗ trợ bởi công nghệ AI gợi ý chẩn đoán, giải quyết 72% vấn đề sức khỏe mà không cần đến bệnh viện.</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow border border-purple-100 hover:shadow-lg transition-shadow">
            <div class="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="font-bold text-purple-700 mb-2">Hồ sơ y tế điện tử</h3>
            <p class="text-sm text-gray-600">Lưu trữ và phân tích dữ liệu y tế cá nhân an toàn với công nghệ blockchain, giúp bác sĩ truy cập lịch sử bệnh án chính xác và toàn diện.</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow border border-purple-100 hover:shadow-lg transition-shadow">
            <div class="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 class="font-bold text-purple-700 mb-2">Tích hợp bảo hiểm</h3>
            <p class="text-sm text-gray-600">Liên kết trực tiếp với 8 công ty bảo hiểm lớn, hỗ trợ thanh toán và hoàn tiền tự động, rút ngắn 85% thời gian xử lý bảo hiểm.</p>
          </div>
        </div>
        
        <div class="bg-white p-5 rounded-lg border border-purple-200 shadow">
          <h3 class="font-bold text-lg text-purple-700 mb-3">Tính năng AI độc quyền</h3>
          
          <div class="space-y-4">
            <div class="flex items-start border-b border-gray-100 pb-4">
              <div class="bg-purple-100 rounded-full p-2 mr-3 mt-1 flex-shrink-0">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-purple-900">MediDiagnose AI</h4>
                <p class="text-sm text-gray-600">Hệ thống AI phân tích triệu chứng dựa trên mô hình học máy được huấn luyện trên 1,5 triệu bệnh án từ 20 bệnh viện lớn tại Việt Nam, hỗ trợ sàng lọc ban đầu với độ chính xác 92,8% cho 30 bệnh lý thường gặp.</p>
              </div>
            </div>
            
            <div class="flex items-start border-b border-gray-100 pb-4">
              <div class="bg-purple-100 rounded-full p-2 mr-3 mt-1 flex-shrink-0">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-purple-900">MediChat GPT</h4>
                <p class="text-sm text-gray-600">Chatbot y tế đa ngôn ngữ được huấn luyện trên dữ liệu y khoa Việt Nam, có khả năng trả lời câu hỏi sức khỏe, hướng dẫn sơ cứu, và thu thập thông tin trước khám, tuân thủ nghiêm ngặt các hướng dẫn y khoa của Bộ Y tế.</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-purple-100 rounded-full p-2 mr-3 mt-1 flex-shrink-0">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-purple-900">MediAnalytics</h4>
                <p class="text-sm text-gray-600">Hệ thống phân tích hình ảnh y tế (X-quang, CT, MRI) hỗ trợ bác sĩ phát hiện bất thường với độ nhạy 95% cho một số bệnh lý phổ biến như viêm phổi, lao phổi và tổn thương xương khớp, giúp giảm 35% thời gian đọc phim.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold text-purple-700 mb-4">Tình hình kinh doanh</h2>
        <div class="overflow-x-auto mb-6">
          <table class="min-w-full border-collapse border border-purple-200 mb-4">
            <thead>
              <tr class="bg-purple-100">
                <th class="border border-purple-200 px-4 py-2 text-left">Chỉ tiêu</th>
                <th class="border border-purple-200 px-4 py-2 text-right">2023</th>
                <th class="border border-purple-200 px-4 py-2 text-right">2024</th>
                <th class="border border-purple-200 px-4 py-2 text-right">2025 (Dự kiến)</th>
                <th class="border border-purple-200 px-4 py-2 text-right">2026 (Dự kiến)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-purple-200 px-4 py-2">Người dùng</td>
                <td class="border border-purple-200 px-4 py-2 text-right">82.000</td>
                <td class="border border-purple-200 px-4 py-2 text-right">250.000</td>
                <td class="border border-purple-200 px-4 py-2 text-right">700.000</td>
                <td class="border border-purple-200 px-4 py-2 text-right">2.000.000</td>
              </tr>
              <tr class="bg-purple-50">
                <td class="border border-purple-200 px-4 py-2">Doanh thu (tỷ đồng)</td>
                <td class="border border-purple-200 px-4 py-2 text-right">5.6</td>
                <td class="border border-purple-200 px-4 py-2 text-right">18.4</td>
                <td class="border border-purple-200 px-4 py-2 text-right">58.0</td>
                <td class="border border-purple-200 px-4 py-2 text-right">145.0</td>
              </tr>
              <tr>
                <td class="border border-purple-200 px-4 py-2">EBITDA (tỷ đồng)</td>
                <td class="border border-purple-200 px-4 py-2 text-right">-3.2</td>
                <td class="border border-purple-200 px-4 py-2 text-right">-1.8</td>
                <td class="border border-purple-200 px-4 py-2 text-right">12.5</td>
                <td class="border border-purple-200 px-4 py-2 text-right">40.2</td>
              </tr>
              <tr class="bg-purple-50">
                <td class="border border-purple-200 px-4 py-2">Đối tác y tế</td>
                <td class="border border-purple-200 px-4 py-2 text-right">120</td>
                <td class="border border-purple-200 px-4 py-2 text-right">315</td>
                <td class="border border-purple-200 px-4 py-2 text-right">800</td>
                <td class="border border-purple-200 px-4 py-2 text-right">1,500</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-5 rounded-lg shadow border border-purple-100">
            <h3 class="font-bold text-lg text-purple-700 mb-3">Mô hình kinh doanh</h3>
            <ul class="list-disc pl-5 space-y-3">
              <li>
                <div class="font-semibold">Phí hoa hồng từ đặt khám (35% doanh thu)</div>
                <p class="text-sm text-gray-600">8-15% phí dịch vụ từ các cơ sở y tế đối tác cho mỗi lượt đặt khám thành công</p>
              </li>
              <li>
                <div class="font-semibold">Tư vấn sức khỏe từ xa (25% doanh thu)</div>
                <p class="text-sm text-gray-600">Phí dịch vụ 50.000-300.000 VND/lượt tư vấn tùy theo chuyên khoa và thời gian</p>
              </li>
              <li>
                <div class="font-semibold">Gói thành viên premium (20% doanh thu)</div>
                <p class="text-sm text-gray-600">Gói thành viên 249.000-799.000 VND/tháng với các đặc quyền ưu tiên đặt lịch, tư vấn không giới hạn</p>
              </li>
              <li>
                <div class="font-semibold">Hợp tác bảo hiểm (15% doanh thu)</div>
                <p class="text-sm text-gray-600">Phí giới thiệu từ các công ty bảo hiểm và phí tích hợp API từ hệ thống bảo hiểm</p>
              </li>
              <li>
                <div class="font-semibold">Giải pháp B2B cho bệnh viện (5% doanh thu)</div>
                <p class="text-sm text-gray-600">Cung cấp hệ thống AI cho các bệnh viện và phòng khám với mô hình SaaS</p>
              </li>
            </ul>
          </div>
          
          <div class="bg-white p-5 rounded-lg shadow border border-purple-100">
            <h3 class="font-bold text-lg text-purple-700 mb-3">Chỉ số hoạt động chính</h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm font-medium">CAC (Chi phí thu hút khách hàng)</span>
                  <span class="text-sm font-semibold">120.000 VND</span>
                </div>
                <div class="w-full bg-gray-200 h-2 rounded-full">
                  <div class="bg-green-500 h-2 rounded-full" style="width: 65%"></div>
                </div>
                <p class="text-xs text-gray-500 mt-1">Giảm 35% so với năm trước</p>
              </div>
              
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm font-medium">LTV (Giá trị vòng đời khách hàng)</span>
                  <span class="text-sm font-semibold">850.000 VND</span>
                </div>
                <div class="w-full bg-gray-200 h-2 rounded-full">
                  <div class="bg-green-500 h-2 rounded-full" style="width: 78%"></div>
                </div>
                <p class="text-xs text-gray-500 mt-1">Tăng 42% so với năm trước</p>
              </div>
              
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm font-medium">Tỷ lệ giữ chân người dùng</span>
                  <span class="text-sm font-semibold">68%</span>
                </div>
                <div class="w-full bg-gray-200 h-2 rounded-full">
                  <div class="bg-green-500 h-2 rounded-full" style="width: 68%"></div>
                </div>
                <p class="text-xs text-gray-500 mt-1">Tăng 15% so với năm trước</p>
              </div>
              
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm font-medium">NPS (Điểm đánh giá khách hàng)</span>
                  <span class="text-sm font-semibold">72/100</span>
                </div>
                <div class="w-full bg-gray-200 h-2 rounded-full">
                  <div class="bg-green-500 h-2 rounded-full" style="width: 72%"></div>
                </div>
                <p class="text-xs text-gray-500 mt-1">Cao hơn 22% so với trung bình ngành</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-purple-700 mb-4">Kế hoạch sử dụng vốn</h2>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-2/3">
            <p class="mb-4">Số tiền huy động thành công 750 triệu đồng sẽ được phân bổ như sau:</p>
            <div class="relative pt-1 mb-6">
              <div class="mb-2 flex justify-between">
                <span class="font-medium text-purple-700">Phát triển sản phẩm và AI (40%) - 300 triệu đồng</span>
                <span class="text-purple-700 font-semibold">40%</span>
              </div>
              <div class="overflow-hidden h-4 text-xs flex rounded-full bg-purple-100">
                <div style="width: 40%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"></div>
              </div>
            </div>
            
            <div class="relative pt-1 mb-6">
              <div class="mb-2 flex justify-between">
                <span class="font-medium text-purple-700">Marketing và phát triển thị trường (35%) - 262.5 triệu đồng</span>
                <span class="text-purple-700 font-semibold">35%</span>
              </div>
              <div class="overflow-hidden h-4 text-xs flex rounded-full bg-purple-100">
                <div style="width: 35%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"></div>
              </div>
            </div>
            
            <div class="relative pt-1 mb-6">
              <div class="mb-2 flex justify-between">
                <span class="font-medium text-purple-700">Mở rộng đội ngũ (15%) - 112.5 triệu đồng</span>
                <span class="text-purple-700 font-semibold">15%</span>
              </div>
              <div class="overflow-hidden h-4 text-xs flex rounded-full bg-purple-100">
                <div style="width: 15%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"></div>
              </div>
            </div>
            
            <div class="relative pt-1 mb-6">
              <div class="mb-2 flex justify-between">
                <span class="font-medium text-purple-700">Vận hành và chi phí pháp lý (10%) - 75 triệu đồng</span>
                <span class="text-purple-700 font-semibold">10%</span>
              </div>
              <div class="overflow-hidden h-4 text-xs flex rounded-full bg-purple-100">
                <div style="width: 10%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"></div>
              </div>
            </div>
          </div>
          <div class="md:w-1/3">
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 class="font-bold text-purple-800 mb-2">Điều khoản đầu tư</h4>
              <ul class="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Loại hình:</strong> Cổ phần ưu đãi</li>
                <li><strong>Định giá pre-money:</strong> 60 tỷ đồng</li>
                <li><strong>Tỷ lệ sở hữu:</strong> 1,25% / 750 triệu đồng</li>
                <li><strong>Quyền ưu tiên:</strong> 1,5x liquidation preference</li>
                <li><strong>Lộ trình thoái vốn:</strong> 4-6 năm</li>
                <li><strong>ROI dự kiến:</strong> 8-12x trong vòng 5 năm</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-purple-700 mb-4">Lộ trình phát triển</h2>
        <div class="bg-white p-5 rounded-lg border border-purple-200 shadow">
          <div class="relative">
            <!-- Timeline -->
            <div class="hidden md:block absolute left-0 top-0 h-full w-1 bg-purple-200 transform translate-x-[11px]"></div>
            
            <div class="space-y-8">
              <div class="flex flex-col md:flex-row">
                <div class="md:w-1/4 flex md:block mb-3 md:mb-0">
                  <div class="bg-purple-500 text-white text-sm font-semibold h-6 w-6 rounded-full flex items-center justify-center md:mx-auto z-10">
                    1
                  </div>
                  <h3 class="font-bold md:text-center md:mt-2 ml-3 md:ml-0">Q4/2025</h3>
                </div>
                <div class="md:w-3/4 md:pl-10">
                  <div class="bg-purple-50 p-3 rounded-lg">
                    <p class="text-sm">Ra mắt phiên bản MediConnect 2.0 với tính năng AI chẩn đoán sơ bộ hỗ trợ 150+ triệu chứng và 80+ bệnh lý phổ biến. Tích hợp với 5 bệnh viện tuyến trung ương.</p>
                  </div>
                </div>
              </div>
              
              <div class="flex flex-col md:flex-row">
                <div class="md:w-1/4 flex md:block mb-3 md:mb-0">
                  <div class="bg-purple-500 text-white text-sm font-semibold h-6 w-6 rounded-full flex items-center justify-center md:mx-auto z-10">
                    2
                  </div>
                  <h3 class="font-bold md:text-center md:mt-2 ml-3 md:ml-0">Q1/2026</h3>
                </div>
                <div class="md:w-3/4 md:pl-10">
                  <div class="bg-purple-50 p-3 rounded-lg">
                    <p class="text-sm">Mở rộng ra 10 tỉnh thành phố lớn, thiết lập 3 trung tâm tư vấn từ xa với đội ngũ 50+ bác sĩ chuyên khoa. Phát hành ứng dụng di động phiên bản 3.0.</p>
                  </div>
                </div>
              </div>
              
              <div class="flex flex-col md:flex-row">
                <div class="md:w-1/4 flex md:block mb-3 md:mb-0">
                  <div class="bg-purple-500 text-white text-sm font-semibold h-6 w-6 rounded-full flex items-center justify-center md:mx-auto z-10">
                    3
                  </div>
                  <h3 class="font-bold md:text-center md:mt-2 ml-3 md:ml-0">Q3/2026</h3>
                </div>
                <div class="md:w-3/4 md:pl-10">
                  <div class="bg-purple-50 p-3 rounded-lg">
                    <p class="text-sm">Tích hợp với hệ thống bảo hiểm y tế quốc gia và 15 công ty bảo hiểm tư nhân. Ra mắt nền tảng MediConnect dành cho bệnh viện với giải pháp quản lý bệnh nhân.</p>
                  </div>
                </div>
              </div>
              
              <div class="flex flex-col md:flex-row">
                <div class="md:w-1/4 flex md:block">
                  <div class="bg-purple-500 text-white text-sm font-semibold h-6 w-6 rounded-full flex items-center justify-center md:mx-auto z-10">
                    4
                  </div>
                  <h3 class="font-bold md:text-center md:mt-2 ml-3 md:ml-0">Q4/2026</h3>
                </div>
                <div class="md:w-3/4 md:pl-10">
                  <div class="bg-purple-50 p-3 rounded-lg">
                    <p class="text-sm">Tiếp cận thị trường Đông Nam Á, bắt đầu từ Thái Lan và Indonesia. Huy động vống Series B với mục tiêu 10 triệu USD để đẩy mạnh tốc độ mở rộng quốc tế.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold text-purple-700 mb-4">Tác động xã hội</h2>
        <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="font-bold text-purple-700 mb-2">Tiếp cận y tế công bằng</h3>
              <p class="text-sm">Mang dịch vụ y tế chất lượng đến vùng nông thôn và vùng sâu vùng xa, giảm khoảng cách về chất lượng chăm sóc y tế giữa các vùng miền.</p>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="font-bold text-purple-700 mb-2">Nâng cao sức khỏe cộng đồng</h3>
              <p class="text-sm">Cung cấp kiến thức y tế và chăm sóc sức khỏe dự phòng cho 5+ triệu người dùng, góp phần giảm 15% chi phí y tế cho các bệnh có thể phòng ngừa.</p>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="font-bold text-purple-700 mb-2">Tạo việc làm trong lĩnh vực y tế</h3>
              <p class="text-sm">Tạo cơ hội việc làm cho 200+ bác sĩ làm việc bán thời gian, tăng thu nhập trung bình 30% cho các bác sĩ tham gia nền tảng.</p>
            </div>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="font-bold text-purple-700 mb-2">Cam kết của chúng tôi</h3>
            <p>"MediConnect cam kết đặt lợi ích của bệnh nhân và cộng đồng lên hàng đầu. Chúng tôi tin rằng trí tuệ nhân tạo kết hợp với chuyên môn y khoa sẽ mang lại cuộc cách mạng trong chăm sóc sức khỏe, giúp mọi người dân Việt Nam, bất kể họ sống ở đâu, đều có thể tiếp cận dịch vụ y tế chất lượng cao với chi phí hợp lý."</p>
            <p class="mt-2 text-right font-semibold">- TS. Hoàng Minh Trí, Đồng sáng lập & CEO</p>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-purple-700 mb-4">Đội ngũ sáng lập</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex">
            <div class="w-20 h-20 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center">
              <span class="text-purple-800 font-bold text-xl">HMT</span>
            </div>
            <div class="ml-4">
              <h4 class="font-bold text-lg">TS. Hoàng Minh Trí</h4>
              <p class="text-sm text-gray-600 mb-2">Đồng sáng lập - CEO</p>
              <p class="text-sm">Bác sĩ với hơn 10 năm kinh nghiệm và MBA từ ĐH Kinh tế TP.HCM. Nguyên Phó Giám đốc Y khoa tại BV Quốc tế Vinmec. Chuyên gia về ứng dụng công nghệ trong y tế với 5 bài báo khoa học quốc tế.</p>
            </div>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex">
            <div class="w-20 h-20 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center">
              <span class="text-purple-800 font-bold text-xl">NMA</span>
            </div>
            <div class="ml-4">
              <h4 class="font-bold text-lg">Nguyễn Thị Mai Anh</h4>
              <p class="text-sm text-gray-600 mb-2">Đồng sáng lập - COO</p>
              <p class="text-sm">Cựu Giám đốc điều hành tại Vinmec với 12 năm kinh nghiệm quản lý y tế. Thạc sĩ Quản trị Kinh doanh từ ĐH Ngoại thương và chứng chỉ Quản lý Y tế từ Đại học Harvard.</p>
            </div>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex">
            <div class="w-20 h-20 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center">
              <span class="text-purple-800 font-bold text-xl">LVT</span>
            </div>
            <div class="ml-4">
              <h4 class="font-bold text-lg">TS. Lê Văn Tùng</h4>
              <p class="text-sm text-gray-600 mb-2">Đồng sáng lập - CTO</p>
              <p class="text-sm">Tiến sĩ Khoa học Máy tính từ ĐH Bách khoa Hà Nội, chuyên gia về AI và máy học với 7 năm kinh nghiệm tại Google và FPT Software. Tác giả của 3 bằng sáng chế về ứng dụng AI trong y tế.</p>
            </div>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex">
            <div class="w-20 h-20 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center">
              <span class="text-purple-800 font-bold text-xl">PVH</span>
            </div>
            <div class="ml-4">
              <h4 class="font-bold text-lg">TS. Phạm Vân Hương</h4>
              <p class="text-sm text-gray-600 mb-2">Giám đốc Y khoa</p>
              <p class="text-sm">Bác sĩ chuyên khoa II với 15 năm kinh nghiệm tại BV Bạch Mai và Vinmec. Tiến sĩ Y khoa từ ĐH Y Hà Nội và đào tạo về Y học Số tại Đại học Johns Hopkins, Hoa Kỳ.</p>
            </div>
          </div>
        </div>
      </div>
    `,
    target: 750000000,
    raised: 50000000,
    status: 'active',
    ownerId: 1,
    imageUrl: placeholderImages.smarthealth,
    createdAt: '2025-08-12T14:15:00Z',
    endDate: new Date('2025-10-01T14:15:00Z'),
    industry: 'Y tế',
    type: 'equity',
    riskLevel: 'high',
    investors: 32,
    rating: 4.2,
    location: 'TP. Hồ Chí Minh',
    teamMembers: [
      {
        name: 'TS. Hoàng Minh Trí',
        role: 'Đồng sáng lập - CEO',
        bio: 'Bác sĩ với hơn 10 năm kinh nghiệm và MBA từ ĐH Kinh tế TP.HCM',
        linkedIn: 'linkedin.com/in/hoangminhtri'
      },
      {
        name: 'Nguyễn Thị Mai Anh',
        role: 'Đồng sáng lập - COO',
        bio: 'Cựu Giám đốc điều hành tại Vinmec với 12 năm kinh nghiệm quản lý y tế',
        linkedIn: 'linkedin.com/in/nguyenthimaianh'
      }
    ]
  }
];

// Get user's campaigns
export const getUserCampaigns = (userId: string): Campaign[] => {
  return mockCampaigns.filter(campaign => campaign.ownerId.toString() === userId);
};

// Get a campaign by ID
export const getCampaignById = (id: number): Campaign | undefined => {
  return mockCampaigns.find(campaign => campaign.id === id);
};
