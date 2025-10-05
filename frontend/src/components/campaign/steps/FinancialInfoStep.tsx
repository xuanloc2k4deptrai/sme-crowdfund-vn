import React from 'react';
import { CampaignFormData, CampaignValidationErrors } from '../../../types/campaign';

interface FinancialInfoStepProps {
  formData: CampaignFormData;
  errors: CampaignValidationErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const FinancialInfoStep: React.FC<FinancialInfoStepProps> = ({ formData, errors, onChange }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Thông tin tài chính</h2>
        <p className="text-gray-600">Xác định các điều khoản tài chính và đầu tư cho dự án</p>
      </div>

      <div className="space-y-6">
        {/* Target Amount */}
        <div>
          <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-2">
            Mục tiêu gọi vốn *
          </label>
          <div className="relative">
            <input
              type="number"
              id="targetAmount"
              name="targetAmount"
              value={formData.targetAmount || ''}
              onChange={onChange}
              placeholder="0"
              min="50000000"
              max="50000000000"
              className={`w-full px-3 py-2 pr-16 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.targetAmount ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">VNĐ</span>
            </div>
          </div>
          {formData.targetAmount > 0 && (
            <p className="mt-1 text-sm text-gray-600">
              {formatCurrency(formData.targetAmount)}
            </p>
          )}
          {errors.targetAmount && <p className="mt-1 text-sm text-red-600">{errors.targetAmount}</p>}
          <p className="mt-1 text-sm text-gray-500">Từ 50 triệu đến 50 tỷ VNĐ</p>
        </div>

        {/* Investment Type */}
        <div>
          <label htmlFor="investmentType" className="block text-sm font-medium text-gray-700 mb-2">
            Loại đầu tư *
          </label>
          <select
            id="investmentType"
            name="investmentType"
            value={formData.investmentType}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="equity">Cổ phần (Equity)</option>
            <option value="debt">Cho vay (Debt)</option>
            <option value="reward">Reward-based</option>
          </select>
          <div className="mt-2 text-sm text-gray-600">
            {formData.investmentType === 'equity' && (
              <p>💡 Nhà đầu tư sẽ nhận cổ phần trong công ty</p>
            )}
            {formData.investmentType === 'debt' && (
              <p>💡 Nhà đầu tư sẽ nhận lãi suất cố định</p>
            )}
            {formData.investmentType === 'reward' && (
              <p>💡 Nhà đầu tư sẽ nhận sản phẩm/dịch vụ</p>
            )}
          </div>
        </div>

        {/* Investment Amounts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="minimumInvestment" className="block text-sm font-medium text-gray-700 mb-2">
              Số tiền đầu tư tối thiểu *
            </label>
            <div className="relative">
              <input
                type="number"
                id="minimumInvestment"
                name="minimumInvestment"
                value={formData.minimumInvestment || ''}
                onChange={onChange}
                placeholder="1000000"
                min="1000000"
                className={`w-full px-3 py-2 pr-16 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.minimumInvestment ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">VNĐ</span>
              </div>
            </div>
            {formData.minimumInvestment > 0 && (
              <p className="mt-1 text-sm text-gray-600">
                {formatCurrency(formData.minimumInvestment)}
              </p>
            )}
            {errors.minimumInvestment && <p className="mt-1 text-sm text-red-600">{errors.minimumInvestment}</p>}
          </div>

          <div>
            <label htmlFor="maximumInvestment" className="block text-sm font-medium text-gray-700 mb-2">
              Số tiền đầu tư tối đa (tuỳ chọn)
            </label>
            <div className="relative">
              <input
                type="number"
                id="maximumInvestment"
                name="maximumInvestment"
                value={formData.maximumInvestment || ''}
                onChange={onChange}
                placeholder="Không giới hạn"
                className={`w-full px-3 py-2 pr-16 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.maximumInvestment ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">VNĐ</span>
              </div>
            </div>
            {formData.maximumInvestment > 0 && (
              <p className="mt-1 text-sm text-gray-600">
                {formatCurrency(formData.maximumInvestment)}
              </p>
            )}
            {errors.maximumInvestment && <p className="mt-1 text-sm text-red-600">{errors.maximumInvestment}</p>}
          </div>
        </div>

        {/* ROI and Term */}
        {formData.investmentType !== 'reward' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="expectedROI" className="block text-sm font-medium text-gray-700 mb-2">
                ROI dự kiến *
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="expectedROI"
                  name="expectedROI"
                  value={formData.expectedROI || ''}
                  onChange={onChange}
                  placeholder="0"
                  min="0"
                  max="100"
                  step="0.1"
                  className={`w-full px-3 py-2 pr-8 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.expectedROI ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
              {errors.expectedROI && <p className="mt-1 text-sm text-red-600">{errors.expectedROI}</p>}
              <p className="mt-1 text-sm text-gray-500">ROI hàng năm dự kiến</p>
            </div>

            <div>
              <label htmlFor="investmentTerm" className="block text-sm font-medium text-gray-700 mb-2">
                Kỳ hạn đầu tư *
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="investmentTerm"
                  name="investmentTerm"
                  value={formData.investmentTerm || ''}
                  onChange={onChange}
                  placeholder="12"
                  min="6"
                  max="120"
                  className={`w-full px-3 py-2 pr-16 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.investmentTerm ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">tháng</span>
                </div>
              </div>
              {errors.investmentTerm && <p className="mt-1 text-sm text-red-600">{errors.investmentTerm}</p>}
              <p className="mt-1 text-sm text-gray-500">Từ 6 đến 120 tháng</p>
            </div>
          </div>
        )}

        {/* Financial Projection */}
        <div>
          <label htmlFor="financialProjection" className="block text-sm font-medium text-gray-700 mb-2">
            Dự báo tài chính
          </label>
          <textarea
            id="financialProjection"
            name="financialProjection"
            value={formData.financialProjection}
            onChange={onChange}
            placeholder="Mô tả dự báo doanh thu, lợi nhuận và các chỉ số tài chính quan trọng trong 3-5 năm tới"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Cung cấp thông tin về dự báo doanh thu, chi phí, và lợi nhuận
          </p>
        </div>

        {/* Risk Assessment */}
        <div>
          <label htmlFor="riskLevel" className="block text-sm font-medium text-gray-700 mb-2">
            Đánh giá rủi ro
          </label>
          <select
            id="riskLevel"
            name="riskLevel"
            value={formData.riskLevel}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Thấp - Dự án ổn định, rủi ro thấp</option>
            <option value="medium">Trung bình - Rủi ro hợp lý, tiềm năng tăng trưởng</option>
            <option value="high">Cao - Rủi ro cao nhưng tiềm năng lợi nhuận lớn</option>
          </select>
          <div className="mt-2 p-3 rounded-md bg-yellow-50 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Lưu ý:</strong> Việc đánh giá rủi ro chính xác giúp thu hút đúng nhóm nhà đầu tư 
              và tuân thủ quy định pháp luật về công bố thông tin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};