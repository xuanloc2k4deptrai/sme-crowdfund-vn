import React from 'react';
import { CampaignFormData, CampaignValidationErrors } from '../../../types/campaign';

interface VisionMissionStepProps {
  formData: CampaignFormData;
  errors: CampaignValidationErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const VisionMissionStep: React.FC<VisionMissionStepProps> = ({ formData, errors, onChange }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Tầm nhìn & Sứ mệnh</h2>
        <p className="text-gray-600">Định hướng chiến lược và giá trị cốt lõi của dự án</p>
      </div>

      <div className="space-y-6">
        {/* Vision */}
        <div>
          <label htmlFor="vision" className="block text-sm font-medium text-gray-700 mb-2">
            Tầm nhìn (Vision) *
          </label>
          <textarea
            id="vision"
            name="vision"
            value={formData.vision}
            onChange={onChange}
            placeholder="Mô tả tầm nhìn dài hạn của dự án - bạn muốn đạt được điều gì trong 5-10 năm tới?"
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.vision ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.vision && <p className="mt-1 text-sm text-red-600">{errors.vision}</p>}
          <div className="mt-2 p-3 rounded-md bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Gợi ý:</strong> Tầm nhìn nên truyền cảm hứng, đầy tham vọng và dễ hiểu. 
              Ví dụ: "Trở thành nền tảng hàng đầu kết nối nông dân và người tiêu dùng tại Việt Nam"
            </p>
          </div>
        </div>

        {/* Mission */}
        <div>
          <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-2">
            Sứ mệnh (Mission) *
          </label>
          <textarea
            id="mission"
            name="mission"
            value={formData.mission}
            onChange={onChange}
            placeholder="Mô tả sứ mệnh của dự án - bạn đang giải quyết vấn đề gì và tạo ra giá trị như thế nào?"
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.mission ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.mission && <p className="mt-1 text-sm text-red-600">{errors.mission}</p>}
          <div className="mt-2 p-3 rounded-md bg-green-50 border border-green-200">
            <p className="text-sm text-green-800">
              ✅ <strong>Gợi ý:</strong> Sứ mệnh nên cụ thể, thực tế và tập trung vào giá trị mang lại. 
              Ví dụ: "Cung cấp nông sản sạch trực tiếp từ nông dân đến người tiêu dùng với giá cả hợp lý"
            </p>
          </div>
        </div>

        {/* Competitive Advantage */}
        <div>
          <label htmlFor="competitiveAdvantage" className="block text-sm font-medium text-gray-700 mb-2">
            Lợi thế cạnh tranh *
          </label>
          <textarea
            id="competitiveAdvantage"
            name="competitiveAdvantage"
            value={formData.competitiveAdvantage}
            onChange={onChange}
            placeholder="Mô tả các lợi thế cạnh tranh độc đáo của dự án so với đối thủ hiện tại"
            rows={5}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.competitiveAdvantage ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.competitiveAdvantage && <p className="mt-1 text-sm text-red-600">{errors.competitiveAdvantage}</p>}
          <div className="mt-2 p-3 rounded-md bg-yellow-50 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              💡 <strong>Các yếu tố cần xem xét:</strong>
            </p>
            <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside space-y-1">
              <li>Công nghệ độc quyền hoặc sáng tạo</li>
              <li>Đội ngũ có kinh nghiệm chuyên sâu</li>
              <li>Quan hệ đối tác chiến lược</li>
              <li>First-mover advantage</li>
              <li>Chi phí thấp hơn đối thủ</li>
              <li>Trải nghiệm khách hàng vượt trội</li>
            </ul>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Giá trị cốt lõi
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="innovation"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="innovation" className="ml-2 text-sm text-gray-700">
                  Đổi mới sáng tạo
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="customer_focus"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="customer_focus" className="ml-2 text-sm text-gray-700">
                  Tập trung khách hàng
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="transparency"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="transparency" className="ml-2 text-sm text-gray-700">
                  Minh bạch
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sustainability"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="sustainability" className="ml-2 text-sm text-gray-700">
                  Phát triển bền vững
                </label>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="quality"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="quality" className="ml-2 text-sm text-gray-700">
                  Chất lượng cao
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="integrity"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="integrity" className="ml-2 text-sm text-gray-700">
                  Chính trực
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="collaboration"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="collaboration" className="ml-2 text-sm text-gray-700">
                  Hợp tác
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="social_impact"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="social_impact" className="ml-2 text-sm text-gray-700">
                  Tác động xã hội
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vấn đề được giải quyết
          </label>
          <textarea
            placeholder="Mô tả vấn đề mà dự án đang giải quyết và tại sao nó quan trọng"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Giải thích pain point mà khách hàng đang gặp phải và giải pháp của bạn
          </p>
        </div>

        {/* Success Metrics */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chỉ số đo lường thành công
          </label>
          <textarea
            placeholder="Các KPI và metrics để đo lường sự thành công của dự án (ARR, MAU, NPS, etc.)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Ví dụ: Doanh thu hàng năm, số lượng người dùng, tỷ lệ hài lòng khách hàng
          </p>
        </div>
      </div>
    </div>
  );
};