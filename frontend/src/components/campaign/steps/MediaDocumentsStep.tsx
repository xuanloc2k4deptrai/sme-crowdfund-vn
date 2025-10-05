import React from 'react';
import { CampaignFormData, CampaignValidationErrors, DocumentType } from '../../../types/campaign';

interface MediaDocumentsStepProps {
  formData: CampaignFormData;
  errors: CampaignValidationErrors;
  documents: File[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDocumentUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDocumentRemove: (index: number) => void;
}

const documentTypes: { value: DocumentType; label: string; description: string }[] = [
  { value: 'business_license', label: 'Giấy phép kinh doanh', description: 'Bắt buộc cho doanh nghiệp' },
  { value: 'financial_statement', label: 'Báo cáo tài chính', description: 'Báo cáo tài chính 2 năm gần nhất' },
  { value: 'tax_certificate', label: 'Chứng nhận thuế', description: 'Chứng nhận hoàn thành nghĩa vụ thuế' },
  { value: 'pitch_deck', label: 'Pitch Deck', description: 'Bản trình bày dự án (PDF)' },
  { value: 'business_plan', label: 'Kế hoạch kinh doanh', description: 'Kế hoạch kinh doanh chi tiết' },
  { value: 'market_research', label: 'Nghiên cứu thị trường', description: 'Báo cáo nghiên cứu thị trường' },
  { value: 'legal_documents', label: 'Tài liệu pháp lý', description: 'Các tài liệu pháp lý liên quan' },
  { value: 'identity_verification', label: 'Giấy tờ tuy thân', description: 'CMND/CCCD của đại diện pháp luật' },
  { value: 'other', label: 'Khác', description: 'Tài liệu khác' }
];

export const MediaDocumentsStep: React.FC<MediaDocumentsStepProps> = ({ 
  formData, 
  errors, 
  documents, 
  onChange, 
  onFileChange, 
  onDocumentUpload, 
  onDocumentRemove 
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Tài liệu & Media</h2>
        <p className="text-gray-600">Tải lên hình ảnh, video và các tài liệu cần thiết</p>
      </div>

      <div className="space-y-6">
        {/* Cover Image */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
            Ảnh bìa dự án *
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {formData.coverImage ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formData.coverImage)}
                    alt="Cover preview"
                    className="mx-auto h-32 w-auto rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => onChange({ target: { name: 'coverImage', value: null } } as any)}
                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="coverImage" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Tải lên ảnh bìa</span>
                      <input
                        id="coverImage"
                        name="coverImage"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={onFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">hoặc kéo thả</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, WebP tối đa 10MB</p>
                </>
              )}
            </div>
          </div>
          {errors.coverImage && <p className="mt-1 text-sm text-red-600">{errors.coverImage}</p>}
        </div>

        {/* Video URL */}
        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Video giới thiệu (tuỳ chọn)
          </label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={onChange}
            placeholder="https://youtube.com/watch?v=..."
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.videoUrl ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.videoUrl && <p className="mt-1 text-sm text-red-600">{errors.videoUrl}</p>}
          <p className="mt-1 text-sm text-gray-500">
            URL video từ YouTube, Vimeo hoặc nền tảng khác
          </p>
        </div>

        {/* Pitch Deck URL */}
        <div>
          <label htmlFor="pitchDeckUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Pitch Deck trực tuyến (tuỳ chọn)
          </label>
          <input
            type="url"
            id="pitchDeckUrl"
            name="pitchDeckUrl"
            value={formData.pitchDeckUrl}
            onChange={onChange}
            placeholder="https://..."
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.pitchDeckUrl ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.pitchDeckUrl && <p className="mt-1 text-sm text-red-600">{errors.pitchDeckUrl}</p>}
          <p className="mt-1 text-sm text-gray-500">
            Link đến pitch deck trên Google Drive, Dropbox, v.v.
          </p>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (từ khoá)
          </label>
          <input
            type="text"
            placeholder="Nhập tags và nhấn Enter (ví dụ: fintech, AI, blockchain)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => {
                    const newTags = formData.tags.filter((_, i) => i !== index);
                    onChange({ target: { name: 'tags', value: newTags } } as any);
                  }}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Documents Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tài liệu hỗ trợ *
          </label>
          
          {/* Required Documents Checklist */}
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="text-sm font-medium text-blue-900 mb-2">📋 Tài liệu bắt buộc:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {documentTypes.slice(0, 4).map(doc => (
                <div key={doc.value} className="flex items-center text-blue-700">
                  <span className="mr-2">•</span>
                  <span>{doc.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m-4-4c0 4.418-7.163 8-16 8S8 32.418 8 28" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="documents" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Tải lên tài liệu</span>
                  <input
                    id="documents"
                    name="documents"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={onDocumentUpload}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">hoặc kéo thả</p>
              </div>
              <p className="text-xs text-gray-500">PDF, DOC, XLS tối đa 20MB mỗi file</p>
            </div>
          </div>

          {/* Document List */}
          {documents.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Tài liệu đã tải lên:</h4>
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(doc.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDocumentRemove(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errors.documents && <p className="mt-1 text-sm text-red-600">{errors.documents}</p>}
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Lưu ý bảo mật</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>• Tất cả tài liệu được mã hóa và lưu trữ bảo mật</p>
                <p>• Chỉ đội ngũ kiểm duyệt mới có quyền truy cập</p>
                <p>• Tài liệu sẽ được xóa sau khi hoàn tất quy trình</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};