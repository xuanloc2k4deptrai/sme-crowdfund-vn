import React from 'react';
import { CampaignFormData, CampaignValidationErrors } from '../../../types/campaign';

interface BusinessInfoStepProps {
  formData: CampaignFormData;
  errors: CampaignValidationErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({ formData, errors, onChange }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Thông tin kinh doanh</h2>
        <p className="text-gray-600">Mô tả chi tiết về mô hình kinh doanh và kế hoạch phát triển</p>
      </div>

      <div className="space-y-6">
        {/* Business Model */}
        <div>
          <label htmlFor="businessModel" className="block text-sm font-medium text-gray-700 mb-2">
            Mô hình kinh doanh *
          </label>
          <textarea
            id="businessModel"
            name="businessModel"
            value={formData.businessModel}
            onChange={onChange}
            placeholder="Mô tả cách thức hoạt động, tạo ra giá trị và vận hành của doanh nghiệp"
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.businessModel ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.businessModel && <p className="mt-1 text-sm text-red-600">{errors.businessModel}</p>}
          <p className="mt-1 text-sm text-gray-500">
            Ví dụ: B2B SaaS, Marketplace, E-commerce, Subscription, etc.
          </p>
        </div>

        {/* Revenue Model */}
        <div>
          <label htmlFor="revenueModel" className="block text-sm font-medium text-gray-700 mb-2">
            Mô hình doanh thu *
          </label>
          <textarea
            id="revenueModel"
            name="revenueModel"
            value={formData.revenueModel}
            onChange={onChange}
            placeholder="Mô tả cách thức tạo ra doanh thu và các nguồn thu nhập chính"
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.revenueModel ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.revenueModel && <p className="mt-1 text-sm text-red-600">{errors.revenueModel}</p>}
          <p className="mt-1 text-sm text-gray-500">
            Ví dụ: Phí đăng ký hàng tháng, Commission, Advertising, One-time purchase, etc.
          </p>
        </div>

        {/* Market Size */}
        <div>
          <label htmlFor="marketSize" className="block text-sm font-medium text-gray-700 mb-2">
            Quy mô thị trường *
          </label>
          <textarea
            id="marketSize"
            name="marketSize"
            value={formData.marketSize}
            onChange={onChange}
            placeholder="Phân tích quy mô thị trường mục tiêu (TAM, SAM, SOM) và tiềm năng tăng trưởng"
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.marketSize ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.marketSize && <p className="mt-1 text-sm text-red-600">{errors.marketSize}</p>}
          <div className="mt-2 p-3 rounded-md bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Gợi ý:</strong> TAM (Total Addressable Market), SAM (Serviceable Addressable Market), 
              SOM (Serviceable Obtainable Market)
            </p>
          </div>
        </div>

        {/* Use of Funds */}
        <div>
          <label htmlFor="useOfFunds" className="block text-sm font-medium text-gray-700 mb-2">
            Kế hoạch sử dụng vốn *
          </label>
          <textarea
            id="useOfFunds"
            name="useOfFunds"
            value={formData.useOfFunds}
            onChange={onChange}
            placeholder="Mô tả chi tiết cách sử dụng số vốn gọi được (R&D, Marketing, Nhân sự, Vận hành, etc.)"
            rows={5}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.useOfFunds ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.useOfFunds && <p className="mt-1 text-sm text-red-600">{errors.useOfFunds}</p>}
          <div className="mt-2 p-3 rounded-md bg-green-50 border border-green-200">
            <p className="text-sm text-green-800">
              ✅ <strong>Yêu cầu:</strong> Phân bổ cụ thể theo %, ví dụ: 40% R&D, 30% Marketing, 20% Nhân sự, 10% Vận hành
            </p>
          </div>
        </div>

        {/* Team Description */}
        <div>
          <label htmlFor="teamDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Đội ngũ thực hiện *
          </label>
          <textarea
            id="teamDescription"
            name="teamDescription"
            value={formData.teamDescription}
            onChange={onChange}
            placeholder="Giới thiệu về đội ngũ sáng lập và các thành viên chủ chốt, kinh nghiệm và thành tựu"
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.teamDescription ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.teamDescription && <p className="mt-1 text-sm text-red-600">{errors.teamDescription}</p>}
          <p className="mt-1 text-sm text-gray-500">
            Bao gồm: Tên, vị trí, kinh nghiệm, thành tựu nổi bật của các thành viên chủ chốt
          </p>
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tình trạng hiện tại</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasPrototype"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasPrototype" className="ml-2 text-sm text-gray-700">
                  Đã có nguyên mẫu sản phẩm
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasCustomers"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasCustomers" className="ml-2 text-sm text-gray-700">
                  Đã có khách hàng/người dùng
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasRevenue"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasRevenue" className="ml-2 text-sm text-gray-700">
                  Đã có doanh thu
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasPatent"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasPatent" className="ml-2 text-sm text-gray-700">
                  Có bằng sáng chế/IP
                </label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mục tiêu sử dụng vốn</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="fundForRnD"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="fundForRnD" className="ml-2 text-sm text-gray-700">
                  Nghiên cứu & Phát triển
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="fundForMarketing"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="fundForMarketing" className="ml-2 text-sm text-gray-700">
                  Marketing & Bán hàng
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="fundForHiring"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="fundForHiring" className="ml-2 text-sm text-gray-700">
                  Tuyển dụng nhân sự
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="fundForExpansion"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="fundForExpansion" className="ml-2 text-sm text-gray-700">
                  Mở rộng thị trường
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};