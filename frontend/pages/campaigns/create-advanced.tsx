import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../../src/contexts/AuthContext';
import { CampaignFormData, CampaignValidationErrors, DocumentType, Milestone } from '../../src/types/campaign';
import { CampaignValidationService } from '../../src/services/campaignValidationService';
import { BasicInfoStep } from '../../src/components/campaign/steps/BasicInfoStep';
import { FinancialInfoStep } from '../../src/components/campaign/steps/FinancialInfoStep';
import { BusinessInfoStep } from '../../src/components/campaign/steps/BusinessInfoStep';
import { VisionMissionStep } from '../../src/components/campaign/steps/VisionMissionStep';
import { MediaDocumentsStep } from '../../src/components/campaign/steps/MediaDocumentsStep';
import { ReviewStep } from '../../src/components/campaign/steps/ReviewStep';

const CampaignCreateAdvanced: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  
  // Form wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  // Form state
  const [formData, setFormData] = useState<CampaignFormData>({
    // Basic Information
    title: '',
    summary: '',
    description: '',
    category: '',
    industry: '',
    location: 'Việt Nam',
    
    // Financial Information
    targetAmount: 0,
    minimumInvestment: 1000000, // 1M VND
    maximumInvestment: 0,
    investmentType: 'equity',
    expectedROI: 0,
    investmentTerm: 12,
    
    // Business Information
    businessModel: '',
    revenueModel: '',
    marketSize: '',
    competitiveAdvantage: '',
    useOfFunds: '',
    financialProjection: '',
    teamDescription: '',
    vision: '',
    mission: '',
    
    // Campaign Settings
    daysToRun: 60,
    startDate: null,
    riskLevel: 'medium',
    
    // Media
    coverImage: null,
    videoUrl: '',
    pitchDeckUrl: '',
    
    // SEO
    tags: [],
    slug: ''
  });
  
  // Additional state
  const [documents, setDocuments] = useState<File[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [errors, setErrors] = useState<CampaignValidationErrors>({});
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

  // Generate slug from title
  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title]);

  // Form validation by step
  const validateStep = (step: number): boolean => {
    let newErrors: CampaignValidationErrors = {};
    
    switch (step) {
      case 1:
        newErrors = CampaignValidationService.validateBasicInfo(formData);
        break;
      case 2:
        newErrors = CampaignValidationService.validateFinancialInfo(formData);
        break;
      case 3:
        newErrors = CampaignValidationService.validateBusinessInfo(formData);
        break;
      case 4:
        newErrors = CampaignValidationService.validateVisionMission(formData);
        break;
      case 5:
        newErrors = CampaignValidationService.validateMediaDocuments(formData, documents);
        break;
      case 6:
        newErrors = CampaignValidationService.validateCampaignSettings(formData);
        // Also check milestones
        if (milestones.length === 0) {
          newErrors.milestones = 'Vui lòng thêm ít nhất một mốc quan trọng';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes with security validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Security validation
    if (typeof value === 'string' && !CampaignValidationService.validateSecurity(value)) {
      setErrors(prev => ({
        ...prev,
        [name]: 'Nội dung chứa ký tự không hợp lệ'
      }));
      return;
    }
    
    let parsedValue: any = value;
    
    if (type === 'number') {
      parsedValue = value === '' ? 0 : parseFloat(value);
    } else if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    } else if (typeof value === 'string') {
      // Sanitize string inputs
      parsedValue = CampaignValidationService.sanitizeInput(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [name]: 'Kích thước file không được vượt quá 10MB'
        }));
        return;
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (name === 'coverImage' && !allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [name]: 'Chỉ chấp nhận file ảnh định dạng JPEG, PNG, WebP'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Clear error
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  // Handle document uploads
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate each file
    const validFiles = files.filter(file => {
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        alert(`File ${file.name} quá lớn. Kích thước tối đa là 20MB.`);
        return false;
      }
      return true;
    });
    
    setDocuments(prev => [...prev, ...validFiles]);
  };

  // Add milestone
  const addMilestone = () => {
    const newMilestone: Milestone = {
      title: '',
      description: '',
      targetAmount: 0,
      deadline: new Date(),
      status: 'pending'
    };
    setMilestones(prev => [...prev, newMilestone]);
  };

  // Update milestone
  const updateMilestone = (index: number, field: keyof Milestone, value: any) => {
    setMilestones(prev => prev.map((milestone, i) => 
      i === index ? { ...milestone, [field]: value } : milestone
    ));
  };

  // Remove milestone
  const removeMilestone = (index: number) => {
    setMilestones(prev => prev.filter((_, i) => i !== index));
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file uploads
      const submitData = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        const value = formData[key as keyof CampaignFormData];
        if (value !== null && value !== undefined) {
          if (value instanceof File) {
            submitData.append(key, value);
          } else if (Array.isArray(value)) {
            submitData.append(key, JSON.stringify(value));
          } else {
            submitData.append(key, String(value));
          }
        }
      });

      // Add documents
      documents.forEach((doc, index) => {
        submitData.append(`document_${index}`, doc);
      });

      // Add milestones
      submitData.append('milestones', JSON.stringify(milestones));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In production: await apiClient.post('/campaigns', submitData);
      
      setSubmitSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        router.push('/dashboard/business');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating campaign:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Có lỗi xảy ra khi tạo dự án. Vui lòng thử lại sau.'
      }));
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

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Dự án đã được tạo thành công!</h3>
          <p className="text-sm text-gray-600 mb-6">
            Dự án của bạn đang được xem xét. Chúng tôi sẽ thông báo kết quả trong vòng 3-5 ngày làm việc.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Tạo dự án gọi vốn chuyên nghiệp | SME CrowdFund VN</title>
        <meta name="description" content="Tạo dự án gọi vốn với các công cụ chuyên nghiệp và bảo mật cao" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <button
                  onClick={() => router.back()}
                  className="mr-4 text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Tạo dự án gọi vốn</h1>
                  <p className="text-sm text-gray-600">Bước {currentStep} / {totalSteps}</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Bản nháp
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
              
              {/* Step indicators */}
              <div className="flex justify-between mt-4">
                {[
                  'Thông tin cơ bản',
                  'Tài chính',
                  'Kinh doanh',
                  'Tầm nhìn',
                  'Tài liệu',
                  'Xem lại'
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-medium ${
                      index + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <p className={`text-xs ${index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg">
            {/* Step Content */}
            {currentStep === 1 && (
              <BasicInfoStep 
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
            )}
            
            {currentStep === 2 && (
              <FinancialInfoStep 
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
            )}
            
            {currentStep === 3 && (
              <BusinessInfoStep 
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
            )}
            
            {currentStep === 4 && (
              <VisionMissionStep 
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
            )}
            
            {currentStep === 5 && (
              <MediaDocumentsStep 
                formData={formData}
                errors={errors}
                documents={documents}
                onChange={handleChange}
                onFileChange={handleFileChange}
                onDocumentUpload={handleDocumentUpload}
                onDocumentRemove={(index) => setDocuments(prev => prev.filter((_, i) => i !== index))}
              />
            )}
            
            {currentStep === 6 && (
              <ReviewStep 
                formData={formData}
                errors={errors}
                documents={documents}
                milestones={milestones}
                onChange={handleChange}
                onMilestoneAdd={addMilestone}
                onMilestoneUpdate={updateMilestone}
                onMilestoneRemove={removeMilestone}
              />
            )}

            {/* Navigation Buttons */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  currentStep === 1
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                ← Quay lại
              </button>

              <div className="flex space-x-3">
                {/* Save Draft Button */}
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  💾 Lưu nháp
                </button>

                {/* Next/Submit Button */}
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Tiếp theo →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-6 py-2 text-sm font-medium text-white rounded-md ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Đang tạo dự án...
                      </>
                    ) : (
                      '🚀 Tạo dự án'
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Compliance Warning */}
            {errors.submit && (
              <div className="mx-6 mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignCreateAdvanced;