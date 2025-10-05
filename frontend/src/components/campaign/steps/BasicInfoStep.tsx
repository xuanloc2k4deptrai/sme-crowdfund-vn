import React from 'react';
import { CampaignFormData, CampaignValidationErrors } from '../../../types/campaign';

interface BasicInfoStepProps {
  formData: CampaignFormData;
  errors: CampaignValidationErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const categories = [
  'Công nghệ',
  'Y tế',
  'Giáo dục',
  'Nông nghiệp',
  'Thương mại điện tử',
  'Dịch vụ',
  'Sản xuất',
  'Du lịch',
  'Bất động sản',
  'Khác'
];

const industries = [
  'Fintech',
  'Healthtech',
  'Edtech',
  'Agritech',
  'E-commerce',
  'SaaS',
  'IoT',
  'AI/ML',
  'Blockchain',
  'Green Tech',
  'Food & Beverage',
  'Fashion',
  'Media',
  'Logistics',
  'Khác'
];

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ formData, errors, onChange }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Thông tin cơ bản</h2>
        <p className="text-gray-600">Cung cấp thông tin cơ bản về dự án của bạn</p>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Tên dự án *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Nhập tên dự án của bạn"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={100}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          <p className="mt-1 text-sm text-gray-500">{formData.title.length}/100 ký tự</p>
        </div>

        {/* Summary */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả ngắn *
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={onChange}
            placeholder="Mô tả ngắn gọn về dự án của bạn"
            rows={3}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.summary ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={200}
          />
          {errors.summary && <p className="mt-1 text-sm text-red-600">{errors.summary}</p>}
          <p className="mt-1 text-sm text-gray-500">{formData.summary.length}/200 ký tự</p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả chi tiết *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Mô tả chi tiết về dự án, sản phẩm/dịch vụ, mục tiêu và kế hoạch thực hiện"
            rows={8}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          <p className="mt-1 text-sm text-gray-500">Tối thiểu 100 ký tự</p>
        </div>

        {/* Category and Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={onChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Chọn danh mục</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
              Ngành nghề *
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={onChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.industry ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Chọn ngành nghề</option>
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Địa điểm
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={onChange}
            placeholder="Vị trí địa lý của dự án"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Auto-generated slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            URL slug (tự động tạo)
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              /campaigns/
            </span>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={onChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="url-slug"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">URL slug sẽ được tạo tự động từ tên dự án</p>
        </div>
      </div>
    </div>
  );
};