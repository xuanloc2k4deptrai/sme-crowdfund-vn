import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../../src/contexts/AuthContext';

const CampaignCreatePage: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    fullDescription: '',
    fundingGoal: 0,
    category: '',
    location: '',
    daysToRun: 30,
    investmentType: 'equity',
    expectedROI: 0,
    term: 12,
    coverImage: null as File | null,
    companyLogo: null as File | null,
    companyName: '',
    vision: '',
    businessModel: '',
    team: '',
    fundingPlan: ''
  });
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Check authentication
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login?redirect=/campaigns/create');
    } else if (user?.role !== 'business') {
      router.push('/dashboard');
    }
  }, [isLoggedIn, user, router]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error for this field when changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Handle file inputs
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
      
      // Clear error for this field when changed
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.name) newErrors.name = 'Tên dự án là bắt buộc';
    if (!formData.shortDescription) newErrors.shortDescription = 'Mô tả ngắn là bắt buộc';
    if (!formData.fullDescription) newErrors.fullDescription = 'Mô tả đầy đủ là bắt buộc';
    if (!formData.fundingGoal || formData.fundingGoal <= 0) newErrors.fundingGoal = 'Vui lòng nhập mục tiêu gọi vốn hợp lệ';
    if (!formData.companyName) newErrors.companyName = 'Tên công ty là bắt buộc';
    
    // Field lengths
    if (formData.shortDescription && formData.shortDescription.length > 150) {
      newErrors.shortDescription = 'Mô tả ngắn không được vượt quá 150 ký tự';
    }
    
    // Numeric validations
    if (formData.expectedROI < 0) newErrors.expectedROI = 'ROI dự kiến không được âm';
    if (formData.term < 1) newErrors.term = 'Kỳ hạn phải lớn hơn 0';
    if (formData.daysToRun < 1 || formData.daysToRun > 90) {
      newErrors.daysToRun = 'Thời gian gọi vốn phải từ 1 đến 90 ngày';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, you would submit to your API here
      // const response = await apiClient.post('/campaigns', formData);
      
      setSubmitSuccess(true);
      
      // Redirect to dashboard after success
      setTimeout(() => {
        router.push('/dashboard/business');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating campaign:', error);
      setErrors({
        ...errors,
        submit: 'Có lỗi xảy ra khi tạo dự án. Vui lòng thử lại sau.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isLoggedIn || !user) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Tạo dự án gọi vốn mới | SME CrowdFund VN</title>
      </Head>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900">Tạo dự án gọi vốn mới</h1>
              <p className="mt-2 text-gray-600">
                Điền đầy đủ thông tin bên dưới để tạo dự án gọi vốn của bạn
              </p>
            </div>
            
            {submitSuccess ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Dự án đã được tạo thành công! Đang chuyển hướng đến trang quản lý...
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-10">
                {errors.submit && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          {errors.submit}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-6">
                  {/* Thông tin cơ bản */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin cơ bản</h2>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Tên dự án <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Nhập tên dự án của bạn"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
                          Mô tả ngắn <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="shortDescription"
                          name="shortDescription"
                          value={formData.shortDescription}
                          onChange={handleChange}
                          rows={2}
                          className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.shortDescription ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Mô tả ngắn gọn về dự án (tối đa 150 ký tự)"
                        />
                        {errors.shortDescription && <p className="mt-1 text-sm text-red-500">{errors.shortDescription}</p>}
                        <p className="mt-1 text-xs text-gray-500">{formData.shortDescription.length}/150 ký tự</p>
                      </div>
                      
                      <div>
                        <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 mb-1">
                          Mô tả đầy đủ <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="fullDescription"
                          name="fullDescription"
                          value={formData.fullDescription}
                          onChange={handleChange}
                          rows={6}
                          className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.fullDescription ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Mô tả chi tiết về dự án của bạn"
                        />
                        {errors.fullDescription && <p className="mt-1 text-sm text-red-500">{errors.fullDescription}</p>}
                      </div>
                    </div>
                  </div>
                  
                  {/* Thông tin gọi vốn */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin gọi vốn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fundingGoal" className="block text-sm font-medium text-gray-700 mb-1">
                          Mục tiêu gọi vốn (VNĐ) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          id="fundingGoal"
                          name="fundingGoal"
                          value={formData.fundingGoal}
                          onChange={handleChange}
                          min="0"
                          step="1000000"
                          className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.fundingGoal ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Ví dụ: 1000000000"
                        />
                        {errors.fundingGoal && <p className="mt-1 text-sm text-red-500">{errors.fundingGoal}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="daysToRun" className="block text-sm font-medium text-gray-700 mb-1">
                          Thời gian gọi vốn (ngày)
                        </label>
                        <input
                          type="number"
                          id="daysToRun"
                          name="daysToRun"
                          value={formData.daysToRun}
                          onChange={handleChange}
                          min="1"
                          max="90"
                          className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.daysToRun ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Số ngày gọi vốn (1-90)"
                        />
                        {errors.daysToRun && <p className="mt-1 text-sm text-red-500">{errors.daysToRun}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                          Danh mục
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">-- Chọn danh mục --</option>
                          <option value="technology">Công nghệ</option>
                          <option value="agriculture">Nông nghiệp</option>
                          <option value="education">Giáo dục</option>
                          <option value="healthcare">Y tế</option>
                          <option value="environment">Môi trường</option>
                          <option value="food">Thực phẩm</option>
                          <option value="retail">Bán lẻ</option>
                          <option value="service">Dịch vụ</option>
                          <option value="other">Khác</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Địa điểm
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ví dụ: TP. Hồ Chí Minh"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="investmentType" className="block text-sm font-medium text-gray-700 mb-1">
                          Hình thức đầu tư
                        </label>
                        <select
                          id="investmentType"
                          name="investmentType"
                          value={formData.investmentType}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="equity">Cổ phần</option>
                          <option value="debt">Nợ</option>
                          <option value="donation">Quyên góp</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="expectedROI" className="block text-sm font-medium text-gray-700 mb-1">
                          ROI dự kiến (%)
                        </label>
                        <input
                          type="number"
                          id="expectedROI"
                          name="expectedROI"
                          value={formData.expectedROI}
                          onChange={handleChange}
                          min="0"
                          step="0.1"
                          className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.expectedROI ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Ví dụ: 15.5"
                        />
                        {errors.expectedROI && <p className="mt-1 text-sm text-red-500">{errors.expectedROI}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="term" className="block text-sm font-medium text-gray-700 mb-1">
                          Kỳ hạn (tháng)
                        </label>
                        <input
                          type="number"
                          id="term"
                          name="term"
                          value={formData.term}
                          onChange={handleChange}
                          min="1"
                          className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.term ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Ví dụ: 36"
                        />
                        {errors.term && <p className="mt-1 text-sm text-red-500">{errors.term}</p>}
                      </div>
                    </div>
                  </div>
                  
                  {/* Thông tin công ty */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin doanh nghiệp</h2>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                          Tên công ty <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Nhập tên công ty của bạn"
                        />
                        {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="vision" className="block text-sm font-medium text-gray-700 mb-1">
                          Tầm nhìn & Sứ mệnh
                        </label>
                        <textarea
                          id="vision"
                          name="vision"
                          value={formData.vision}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Mô tả tầm nhìn và sứ mệnh của công ty bạn"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="businessModel" className="block text-sm font-medium text-gray-700 mb-1">
                          Mô hình kinh doanh
                        </label>
                        <textarea
                          id="businessModel"
                          name="businessModel"
                          value={formData.businessModel}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Mô tả mô hình kinh doanh của công ty"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">
                          Đội ngũ
                        </label>
                        <textarea
                          id="team"
                          name="team"
                          value={formData.team}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Mô tả đội ngũ lãnh đạo và nhân sự chủ chốt"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="fundingPlan" className="block text-sm font-medium text-gray-700 mb-1">
                          Kế hoạch sử dụng vốn
                        </label>
                        <textarea
                          id="fundingPlan"
                          name="fundingPlan"
                          value={formData.fundingPlan}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Mô tả chi tiết kế hoạch sử dụng vốn sau khi gọi vốn thành công"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Hình ảnh */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Hình ảnh</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
                          Ảnh bìa dự án
                        </label>
                        <input
                          type="file"
                          id="coverImage"
                          name="coverImage"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="mt-1 text-xs text-gray-500">Kích thước đề xuất: 1200x630px, tối đa 5MB</p>
                      </div>
                      
                      <div>
                        <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-700 mb-1">
                          Logo công ty
                        </label>
                        <input
                          type="file"
                          id="companyLogo"
                          name="companyLogo"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="mt-1 text-xs text-gray-500">Kích thước đề xuất: 200x200px, tối đa 2MB</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Nút submit */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 mr-4"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Đang xử lý...
                        </>
                      ) : 'Tạo dự án'}
                    </button>
                  </div>
                </div>
              </form>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignCreatePage;
