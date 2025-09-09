import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import { apiClient } from '../../services/apiClient';

interface CampaignFormData {
  title: string;
  description: string;
  goal: number;
  duration: number;
  category: string;
  imageUrl: string;
}

const CampaignForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CampaignFormData>();
    const [submitting, setSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const onSubmit = async (data: CampaignFormData) => {
        setSubmitting(true);
        try {
            const response = await apiClient.post('/api/campaigns', data);
            if (response.status === 201) {
                setSubmissionStatus({ 
                  type: 'success', 
                  message: 'Dự án đã được gửi thành công và đang chờ phê duyệt!' 
                });
                reset();
            }
        } catch (error) {
            setSubmissionStatus({ 
              type: 'error', 
              message: 'Không thể gửi dự án. Vui lòng thử lại sau.' 
            });
        } finally {
            setSubmitting(false);
        }
    };

    const categories = [
      "Công nghệ",
      "Thực phẩm & Đồ uống",
      "Nghệ thuật & Thủ công",
      "Giáo dục",
      "Sức khỏe & Y tế",
      "Bán lẻ",
      "Dịch vụ",
      "Khác"
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tạo dự án gọi vốn mới</h2>
          
          {submissionStatus && (
            <div className={`p-4 mb-6 rounded-md ${
              submissionStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {submissionStatus.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Tên dự án</label>
              <input
                id="title"
                type="text"
                placeholder="Nhập tên dự án của bạn"
                {...register('title', { 
                  required: 'Vui lòng nhập tên dự án',
                  minLength: { value: 5, message: 'Tên dự án phải có ít nhất 5 ký tự' } 
                })}
                className={`input ${errors.title ? 'border-red-500 focus:ring-red-400' : ''}`}
              />
              {errors.title && <p className="form-error">{errors.title.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">Danh mục</label>
              <select
                id="category"
                {...register('category', { required: 'Vui lòng chọn danh mục' })}
                className={`input ${errors.category ? 'border-red-500 focus:ring-red-400' : ''}`}
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <p className="form-error">{errors.category.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Mô tả dự án</label>
              <textarea
                id="description"
                rows={5}
                placeholder="Mô tả chi tiết về dự án của bạn..."
                {...register('description', { 
                  required: 'Vui lòng nhập mô tả dự án',
                  minLength: { value: 20, message: 'Mô tả phải có ít nhất 20 ký tự' } 
                })}
                className={`input ${errors.description ? 'border-red-500 focus:ring-red-400' : ''}`}
              />
              {errors.description && <p className="form-error">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="goal" className="form-label">Số tiền cần gọi vốn (VND)</label>
                <input
                  id="goal"
                  type="number"
                  placeholder="VD: 100000000"
                  {...register('goal', { 
                    required: 'Vui lòng nhập số tiền cần gọi vốn',
                    min: { value: 10000000, message: 'Số tiền tối thiểu là 10,000,000 VND' } 
                  })}
                  className={`input ${errors.goal ? 'border-red-500 focus:ring-red-400' : ''}`}
                />
                {errors.goal && <p className="form-error">{errors.goal.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="duration" className="form-label">Thời gian gọi vốn (ngày)</label>
                <input
                  id="duration"
                  type="number"
                  placeholder="VD: 30"
                  {...register('duration', { 
                    required: 'Vui lòng nhập thời gian gọi vốn',
                    min: { value: 7, message: 'Thời gian tối thiểu là 7 ngày' },
                    max: { value: 90, message: 'Thời gian tối đa là 90 ngày' }
                  })}
                  className={`input ${errors.duration ? 'border-red-500 focus:ring-red-400' : ''}`}
                />
                {errors.duration && <p className="form-error">{errors.duration.message}</p>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl" className="form-label">Đường dẫn hình ảnh</label>
              <input
                id="imageUrl"
                type="text"
                placeholder="https://example.com/image.jpg"
                {...register('imageUrl', { 
                  required: 'Vui lòng nhập đường dẫn hình ảnh',
                  pattern: { 
                    value: /^(https?:\/\/.*)\.(jpg|jpeg|png|gif|bmp)$/i, 
                    message: 'Vui lòng nhập đường dẫn hình ảnh hợp lệ (jpg, png, gif)' 
                  } 
                })}
                className={`input ${errors.imageUrl ? 'border-red-500 focus:ring-red-400' : ''}`}
              />
              {errors.imageUrl && <p className="form-error">{errors.imageUrl.message}</p>}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => reset()}
                className="px-6"
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                disabled={submitting}
                className="px-6"
              >
                {submitting ? 'Đang gửi...' : 'Gửi dự án'}
              </Button>
            </div>
          </form>
        </div>
    );
};

export default CampaignForm;