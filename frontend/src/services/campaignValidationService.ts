import { CampaignFormData, CampaignValidationErrors } from '../types/campaign';

export class CampaignValidationService {
  
  // Security patterns
  private static readonly SQL_INJECTION_PATTERN = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i;
  private static readonly XSS_PATTERN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  private static readonly MALICIOUS_PATTERNS = [
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i,
    /onclick=/i
  ];

  // Business rules
  private static readonly MIN_FUNDING_AMOUNT = 50000000; // 50M VND
  private static readonly MAX_FUNDING_AMOUNT = 50000000000; // 50B VND
  private static readonly MIN_INVESTMENT_AMOUNT = 1000000; // 1M VND
  private static readonly MIN_DESCRIPTION_LENGTH = 100;
  private static readonly MAX_TITLE_LENGTH = 100;
  private static readonly MAX_SUMMARY_LENGTH = 200;
  private static readonly MIN_CAMPAIGN_DAYS = 30;
  private static readonly MAX_CAMPAIGN_DAYS = 90;
  private static readonly MIN_INVESTMENT_TERM = 6; // months
  private static readonly MAX_INVESTMENT_TERM = 120; // months

  /**
   * Validate input for security threats
   */
  static validateSecurity(input: string): boolean {
    // Check for SQL injection
    if (this.SQL_INJECTION_PATTERN.test(input)) {
      return false;
    }

    // Check for XSS
    if (this.XSS_PATTERN.test(input)) {
      return false;
    }

    // Check for other malicious patterns
    for (const pattern of this.MALICIOUS_PATTERNS) {
      if (pattern.test(input)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Sanitize input string
   */
  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(this.XSS_PATTERN, '')
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/[\r\n\t]/g, ' ') // Replace line breaks and tabs with spaces
      .replace(/\s+/g, ' '); // Replace multiple spaces with single space
  }

  /**
   * Validate email format
   */
  static validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  /**
   * Validate URL format
   */
  static validateURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate phone number (Vietnam format)
   */
  static validatePhoneNumber(phone: string): boolean {
    const phonePattern = /^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/;
    return phonePattern.test(phone.replace(/\s/g, ''));
  }

  /**
   * Validate file size and type
   */
  static validateFile(file: File, allowedTypes: string[], maxSizeMB: number): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      return {
        valid: false,
        error: `Kích thước file không được vượt quá ${maxSizeMB}MB`
      };
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Loại file không được hỗ trợ. Chỉ chấp nhận: ${allowedTypes.join(', ')}`
      };
    }

    return { valid: true };
  }

  /**
   * Validate step 1: Basic Information
   */
  static validateBasicInfo(formData: CampaignFormData): CampaignValidationErrors {
    const errors: CampaignValidationErrors = {};

    // Title validation
    if (!formData.title?.trim()) {
      errors.title = 'Tên dự án là bắt buộc';
    } else if (formData.title.length > this.MAX_TITLE_LENGTH) {
      errors.title = `Tên dự án không được vượt quá ${this.MAX_TITLE_LENGTH} ký tự`;
    } else if (!this.validateSecurity(formData.title)) {
      errors.title = 'Tên dự án chứa nội dung không hợp lệ';
    }

    // Summary validation
    if (!formData.summary?.trim()) {
      errors.summary = 'Mô tả ngắn là bắt buộc';
    } else if (formData.summary.length > this.MAX_SUMMARY_LENGTH) {
      errors.summary = `Mô tả ngắn không được vượt quá ${this.MAX_SUMMARY_LENGTH} ký tự`;
    } else if (!this.validateSecurity(formData.summary)) {
      errors.summary = 'Mô tả ngắn chứa nội dung không hợp lệ';
    }

    // Description validation
    if (!formData.description?.trim()) {
      errors.description = 'Mô tả chi tiết là bắt buộc';
    } else if (formData.description.length < this.MIN_DESCRIPTION_LENGTH) {
      errors.description = `Mô tả chi tiết phải có ít nhất ${this.MIN_DESCRIPTION_LENGTH} ký tự`;
    } else if (!this.validateSecurity(formData.description)) {
      errors.description = 'Mô tả chi tiết chứa nội dung không hợp lệ';
    }

    // Category validation
    if (!formData.category) {
      errors.category = 'Vui lòng chọn danh mục';
    }

    // Industry validation
    if (!formData.industry) {
      errors.industry = 'Vui lòng chọn ngành nghề';
    }

    // Slug validation
    if (formData.slug && !/^[a-z0-9-]+$/.test(formData.slug)) {
      errors.slug = 'URL slug chỉ được chứa chữ thường, số và dấu gạch ngang';
    }

    return errors;
  }

  /**
   * Validate step 2: Financial Information
   */
  static validateFinancialInfo(formData: CampaignFormData): CampaignValidationErrors {
    const errors: CampaignValidationErrors = {};

    // Target amount validation
    if (!formData.targetAmount || formData.targetAmount < this.MIN_FUNDING_AMOUNT) {
      errors.targetAmount = `Mục tiêu gọi vốn tối thiểu là ${this.MIN_FUNDING_AMOUNT.toLocaleString('vi-VN')} VNĐ`;
    } else if (formData.targetAmount > this.MAX_FUNDING_AMOUNT) {
      errors.targetAmount = `Mục tiêu gọi vốn tối đa là ${this.MAX_FUNDING_AMOUNT.toLocaleString('vi-VN')} VNĐ`;
    }

    // Minimum investment validation
    if (!formData.minimumInvestment || formData.minimumInvestment < this.MIN_INVESTMENT_AMOUNT) {
      errors.minimumInvestment = `Số tiền đầu tư tối thiểu là ${this.MIN_INVESTMENT_AMOUNT.toLocaleString('vi-VN')} VNĐ`;
    }

    // Maximum investment validation
    if (formData.maximumInvestment && formData.maximumInvestment < formData.minimumInvestment) {
      errors.maximumInvestment = 'Số tiền đầu tư tối đa phải lớn hơn số tiền tối thiểu';
    }

    // ROI validation for equity/debt investments
    if (formData.investmentType !== 'reward') {
      if (!formData.expectedROI || formData.expectedROI < 0) {
        errors.expectedROI = 'Vui lòng nhập ROI dự kiến hợp lệ';
      } else if (formData.expectedROI > 100) {
        errors.expectedROI = 'ROI dự kiến không thể vượt quá 100%';
      }
    }

    // Investment term validation
    if (!formData.investmentTerm || 
        formData.investmentTerm < this.MIN_INVESTMENT_TERM || 
        formData.investmentTerm > this.MAX_INVESTMENT_TERM) {
      errors.investmentTerm = `Kỳ hạn đầu tư phải từ ${this.MIN_INVESTMENT_TERM} đến ${this.MAX_INVESTMENT_TERM} tháng`;
    }

    // Financial projection validation
    if (formData.financialProjection && !this.validateSecurity(formData.financialProjection)) {
      errors.financialProjection = 'Dự báo tài chính chứa nội dung không hợp lệ';
    }

    return errors;
  }

  /**
   * Validate step 3: Business Information
   */
  static validateBusinessInfo(formData: CampaignFormData): CampaignValidationErrors {
    const errors: CampaignValidationErrors = {};

    const requiredFields = [
      'businessModel',
      'revenueModel', 
      'marketSize',
      'useOfFunds',
      'teamDescription'
    ];

    for (const field of requiredFields) {
      const value = formData[field as keyof CampaignFormData] as string;
      if (!value?.trim()) {
        errors[field] = `${this.getFieldDisplayName(field)} là bắt buộc`;
      } else if (!this.validateSecurity(value)) {
        errors[field] = `${this.getFieldDisplayName(field)} chứa nội dung không hợp lệ`;
      }
    }

    return errors;
  }

  /**
   * Validate step 4: Vision & Mission
   */
  static validateVisionMission(formData: CampaignFormData): CampaignValidationErrors {
    const errors: CampaignValidationErrors = {};

    const requiredFields = ['vision', 'mission', 'competitiveAdvantage'];

    for (const field of requiredFields) {
      const value = formData[field as keyof CampaignFormData] as string;
      if (!value?.trim()) {
        errors[field] = `${this.getFieldDisplayName(field)} là bắt buộc`;
      } else if (!this.validateSecurity(value)) {
        errors[field] = `${this.getFieldDisplayName(field)} chứa nội dung không hợp lệ`;
      }
    }

    return errors;
  }

  /**
   * Validate step 5: Media & Documents
   */
  static validateMediaDocuments(formData: CampaignFormData, documents: File[]): CampaignValidationErrors {
    const errors: CampaignValidationErrors = {};

    // Cover image validation
    if (!formData.coverImage) {
      errors.coverImage = 'Ảnh bìa là bắt buộc';
    } else {
      const imageValidation = this.validateFile(
        formData.coverImage,
        ['image/jpeg', 'image/png', 'image/webp'],
        10
      );
      if (!imageValidation.valid) {
        errors.coverImage = imageValidation.error!;
      }
    }

    // Video URL validation
    if (formData.videoUrl && !this.validateURL(formData.videoUrl)) {
      errors.videoUrl = 'URL video không hợp lệ';
    }

    // Pitch deck URL validation
    if (formData.pitchDeckUrl && !this.validateURL(formData.pitchDeckUrl)) {
      errors.pitchDeckUrl = 'URL pitch deck không hợp lệ';
    }

    // Documents validation
    if (documents.length === 0) {
      errors.documents = 'Vui lòng tải lên ít nhất một tài liệu';
    } else {
      // Validate each document
      for (let i = 0; i < documents.length; i++) {
        const doc = documents[i];
        const docValidation = this.validateFile(
          doc,
          [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          ],
          20
        );
        if (!docValidation.valid) {
          errors[`document_${i}`] = docValidation.error!;
        }
      }
    }

    return errors;
  }

  /**
   * Validate step 6: Campaign Settings
   */
  static validateCampaignSettings(formData: CampaignFormData): CampaignValidationErrors {
    const errors: CampaignValidationErrors = {};

    // Campaign duration validation
    if (formData.daysToRun < this.MIN_CAMPAIGN_DAYS || formData.daysToRun > this.MAX_CAMPAIGN_DAYS) {
      errors.daysToRun = `Thời gian gọi vốn phải từ ${this.MIN_CAMPAIGN_DAYS} đến ${this.MAX_CAMPAIGN_DAYS} ngày`;
    }

    // Start date validation
    if (formData.startDate && formData.startDate < new Date()) {
      errors.startDate = 'Ngày bắt đầu không thể là ngày trong quá khứ';
    }

    return errors;
  }

  /**
   * Comprehensive form validation
   */
  static validateFullForm(formData: CampaignFormData, documents: File[]): CampaignValidationErrors {
    return {
      ...this.validateBasicInfo(formData),
      ...this.validateFinancialInfo(formData),
      ...this.validateBusinessInfo(formData),
      ...this.validateVisionMission(formData),
      ...this.validateMediaDocuments(formData, documents),
      ...this.validateCampaignSettings(formData)
    };
  }

  /**
   * Get display name for field
   */
  private static getFieldDisplayName(field: string): string {
    const fieldNames: Record<string, string> = {
      businessModel: 'Mô hình kinh doanh',
      revenueModel: 'Mô hình doanh thu',
      marketSize: 'Quy mô thị trường',
      useOfFunds: 'Kế hoạch sử dụng vốn',
      teamDescription: 'Thông tin đội ngũ',
      vision: 'Tầm nhìn',
      mission: 'Sứ mệnh',
      competitiveAdvantage: 'Lợi thế cạnh tranh'
    };
    return fieldNames[field] || field;
  }

  /**
   * Check compliance with Vietnamese regulations
   */
  static validateCompliance(formData: CampaignFormData): { valid: boolean; warnings: string[] } {
    const warnings: string[] = [];

    // Check funding amount limits (based on Vietnam securities law)
    if (formData.targetAmount > 15000000000) { // 15B VND
      warnings.push('Dự án có mục tiêu gọi vốn trên 15 tỷ VNĐ cần tuân thủ nghiêm ngặt quy định về chứng khoán');
    }

    // Check investment type compliance
    if (formData.investmentType === 'equity' && formData.expectedROI > 30) {
      warnings.push('ROI trên 30% cần được giải thích rõ ràng và có căn cứ thuyết phục');
    }

    // Check required disclosures
    if (!formData.financialProjection) {
      warnings.push('Khuyến nghị cung cấp dự báo tài chính để tuân thủ quy định công bố thông tin');
    }

    return {
      valid: warnings.length === 0,
      warnings
    };
  }
}