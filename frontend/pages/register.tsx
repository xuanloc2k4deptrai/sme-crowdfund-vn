import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthContext } from '../src/contexts/AuthContext';
import Button from '../src/components/ui/Button';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'investor' | 'business';
  termsAccepted: boolean;
}

export default function Register() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext must be used within AuthProvider');
  }
  const { register: registerUser } = authContext;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterForm>();

  const password = watch('password');
  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await registerUser(data.name, data.email, data.password, data.role);
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi khi đăng ký');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Left side - Branding */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900"></div>
          <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <div className="bg-white/20 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold">SME</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">SME CrowdFund</h2>
                <p className="text-blue-100 text-lg">Nền tảng gọi vốn và đầu tư cho doanh nghiệp vừa và nhỏ</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Đầu tư an toàn và minh bạch</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Hỗ trợ doanh nghiệp Việt Nam</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Lợi nhuận hấp dẫn</span>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="font-medium">Đã có tài khoản?</p>
                <Link href="/login" className="text-blue-200 hover:text-white font-medium underline">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Register Form */}
        <div className="p-8 md:p-10 overflow-y-auto max-h-screen">
          <div className="mb-8 md:mb-10 text-center">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center justify-center">
                <div className="bg-blue-600 p-3 rounded-lg mr-3">
                  <span className="text-white font-bold text-xl">SME</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">CrowdFund</span>
              </div>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tạo tài khoản mới</h1>
            <p className="text-gray-600 mt-1">Để bắt đầu hành trình đầu tư hoặc gọi vốn</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên *
              </label>
              <input
                {...register('name', { 
                  required: 'Vui lòng nhập họ và tên',
                  minLength: { value: 2, message: 'Họ tên phải có ít nhất 2 ký tự' }
                })}
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập họ và tên"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                {...register('email', { 
                  required: 'Vui lòng nhập email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email không hợp lệ'
                  }
                })}
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu *
              </label>
              <input
                {...register('password', { 
                  required: 'Vui lòng nhập mật khẩu',
                  minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                })}
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Xác nhận mật khẩu *
              </label>
              <input
                {...register('confirmPassword', { 
                  required: 'Vui lòng xác nhận mật khẩu',
                  validate: value => value === password || 'Mật khẩu xác nhận không khớp'
                })}
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập lại mật khẩu"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Bạn là *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative cursor-pointer">
                  <input
                    {...register('role', { required: 'Vui lòng chọn vai trò' })}
                    type="radio"
                    value="investor"
                    className="sr-only"
                  />
                  <div className={`border-2 rounded-lg p-4 transition-all ${
                    selectedRole === 'investor' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}>
                    <div className="flex items-center">
                      <div className={`w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center ${
                        selectedRole === 'investor'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedRole === 'investor' && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Nhà đầu tư</div>
                        <div className="text-sm text-gray-500">Tìm kiếm cơ hội đầu tư</div>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input
                    {...register('role', { required: 'Vui lòng chọn vai trò' })}
                    type="radio"
                    value="business"
                    className="sr-only"
                  />
                  <div className={`border-2 rounded-lg p-4 transition-all ${
                    selectedRole === 'business' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}>
                    <div className="flex items-center">
                      <div className={`w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center ${
                        selectedRole === 'business'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedRole === 'business' && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Doanh nghiệp</div>
                        <div className="text-sm text-gray-500">Cần gọi vốn cho dự án</div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  {...register('termsAccepted', { required: 'Vui lòng đồng ý với điều khoản' })}
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-500">
                  Tôi đồng ý với{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                    Điều khoản sử dụng
                  </Link>{' '}
                  và{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Chính sách bảo mật
                  </Link>
                </label>
                {errors.termsAccepted && (
                  <p className="mt-1 text-sm text-red-600">{errors.termsAccepted.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Tạo tài khoản'}
            </Button>

            <div className="text-center pt-4">
              <span className="text-gray-600">Đã có tài khoản? </span>
              <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}