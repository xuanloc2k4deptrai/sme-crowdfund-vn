import React from 'react';
import { CampaignFormData, CampaignValidationErrors, Milestone } from '../../../types/campaign';
import { CampaignValidationService } from '../../../services/campaignValidationService';

interface ReviewStepProps {
  formData: CampaignFormData;
  errors: CampaignValidationErrors;
  documents: File[];
  milestones: Milestone[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onMilestoneAdd: () => void;
  onMilestoneUpdate: (index: number, field: keyof Milestone, value: any) => void;
  onMilestoneRemove: (index: number) => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ 
  formData, 
  errors, 
  documents, 
  milestones, 
  onChange, 
  onMilestoneAdd, 
  onMilestoneUpdate, 
  onMilestoneRemove 
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN').format(date);
  };

  // Check compliance
  const complianceCheck = CampaignValidationService.validateCompliance(formData);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Xem lại & Hoàn tất</h2>
        <p className="text-gray-600">Kiểm tra lại thông tin và thiết lập các mốc quan trọng</p>
      </div>

      <div className="space-y-8">
        {/* Campaign Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Thiết lập chiến dịch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="daysToRun" className="block text-sm font-medium text-gray-700 mb-2">
                Thời gian gọi vốn (ngày) *
              </label>
              <input
                type="number"
                id="daysToRun"
                name="daysToRun"
                value={formData.daysToRun}
                onChange={onChange}
                min="30"
                max="90"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.daysToRun ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.daysToRun && <p className="mt-1 text-sm text-red-600">{errors.daysToRun}</p>}
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Ngày bắt đầu (tuỳ chọn)
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate ? formData.startDate.toISOString().split('T')[0] : ''}
                onChange={(e) => onChange({
                  target: {
                    name: 'startDate',
                    value: e.target.value ? new Date(e.target.value) : null
                  }
                } as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">Để trống nếu muốn khởi động ngay sau duyệt</p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Các mốc quan trọng *</h3>
            <button
              type="button"
              onClick={onMilestoneAdd}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              + Thêm mốc
            </button>
          </div>

          {milestones.length === 0 ? (
            <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-md">
              <p className="text-gray-500">Chưa có mốc quan trọng nào</p>
              <button
                type="button"
                onClick={onMilestoneAdd}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                Thêm mốc đầu tiên
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tiêu đề mốc
                      </label>
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => onMilestoneUpdate(index, 'title', e.target.value)}
                        placeholder="Ví dụ: Hoàn thành MVP"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mục tiêu số tiền
                      </label>
                      <input
                        type="number"
                        value={milestone.targetAmount}
                        onChange={(e) => onMilestoneUpdate(index, 'targetAmount', parseInt(e.target.value))}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hạn hoàn thành
                      </label>
                      <input
                        type="date"
                        value={milestone.deadline.toISOString().split('T')[0]}
                        onChange={(e) => onMilestoneUpdate(index, 'deadline', new Date(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => onMilestoneRemove(index)}
                        className="px-3 py-2 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mô tả
                    </label>
                    <textarea
                      value={milestone.description}
                      onChange={(e) => onMilestoneUpdate(index, 'description', e.target.value)}
                      placeholder="Mô tả chi tiết về mốc này..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {errors.milestones && <p className="mt-1 text-sm text-red-600">{errors.milestones}</p>}
        </div>

        {/* Summary Review */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tóm tắt dự án</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Thông tin cơ bản</h4>
                <dl className="space-y-1 text-sm">
                  <div>
                    <dt className="text-gray-600">Tên dự án:</dt>
                    <dd className="font-medium">{formData.title}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Danh mục:</dt>
                    <dd>{formData.category}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Ngành nghề:</dt>
                    <dd>{formData.industry}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Địa điểm:</dt>
                    <dd>{formData.location}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Thông tin tài chính</h4>
                <dl className="space-y-1 text-sm">
                  <div>
                    <dt className="text-gray-600">Mục tiêu gọi vốn:</dt>
                    <dd className="font-medium text-green-600">{formatCurrency(formData.targetAmount)}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Loại đầu tư:</dt>
                    <dd>{formData.investmentType === 'equity' ? 'Cổ phần' : formData.investmentType === 'debt' ? 'Cho vay' : 'Reward-based'}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Đầu tư tối thiểu:</dt>
                    <dd>{formatCurrency(formData.minimumInvestment)}</dd>
                  </div>
                  {formData.expectedROI > 0 && (
                    <div>
                      <dt className="text-gray-600">ROI dự kiến:</dt>
                      <dd>{formData.expectedROI}% / năm</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Mô tả ngắn</h4>
              <p className="text-sm text-gray-700">{formData.summary}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Tài liệu đã tải lên</h4>
              <p className="text-sm text-gray-600">{documents.length} tài liệu</p>
            </div>
          </div>
        </div>

        {/* Compliance Check */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Kiểm tra tuân thủ</h3>
          <div className={`p-4 rounded-md ${complianceCheck.valid ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {complianceCheck.valid ? (
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${complianceCheck.valid ? 'text-green-800' : 'text-yellow-800'}`}>
                  {complianceCheck.valid ? 'Tuân thủ quy định' : 'Cần lưu ý'}
                </h3>
                {!complianceCheck.valid && (
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul className="list-disc list-inside space-y-1">
                      {complianceCheck.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Final Checklist */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Checklist cuối cùng</h3>
          <div className="space-y-2">
            {[
              'Đã kiểm tra tất cả thông tin chính xác',
              'Đã tải lên đầy đủ tài liệu bắt buộc',
              'Đã thiết lập các mốc quan trọng hợp lý',
              'Đã đọc và hiểu các điều khoản sử dụng',
              'Cam kết tuân thủ quy định pháp luật Việt Nam'
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`checklist_${index}`}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`checklist_${index}`} className="ml-2 text-sm text-gray-700">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Điều khoản quan trọng</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Bằng cách tạo dự án, bạn xác nhận:</p>
                <ul className="mt-1 list-disc list-inside space-y-1">
                  <li>Tất cả thông tin cung cấp là chính xác và trung thực</li>
                  <li>Dự án tuân thủ pháp luật Việt Nam về gọi vốn cộng đồng</li>
                  <li>Bạn có đầy đủ quyền hạn để đại diện cho dự án</li>
                  <li>Chấp nhận chịu phí dịch vụ theo quy định</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};