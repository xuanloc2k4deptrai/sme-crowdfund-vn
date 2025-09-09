import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';

const Header: React.FC = () => {
    const auth = useContext(AuthContext);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    const handleLogout = () => {
        if (auth) {
            auth.logout();
            router.push('/');
        }
    };
    
    return (
        <header className="bg-blue-600 text-white">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-white">SME CrowdFund</span>
                    <span className="text-lg font-bold bg-yellow-400 text-blue-800 px-2 py-1 rounded-md">VN</span>
                </Link>
                
                <nav className="hidden md:flex space-x-6">
                    <Link href="/campaigns" className="hover:text-blue-200">
                        Các dự án
                    </Link>
                    <Link href="/ai-features" className="hover:text-blue-200">
                        Công nghệ AI
                    </Link>
                    <Link href="/about" className="hover:text-blue-200">
                        Giới thiệu
                    </Link>
                    <Link href="/contact" className="hover:text-blue-200">
                        Liên hệ
                    </Link>
                </nav>
                
                <div className="flex items-center space-x-4">
                    {!isClient ? (
                        // Show loading state or default buttons during SSR
                        <>
                            <Link 
                                href="/login" 
                                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100"
                            >
                                Đăng nhập
                            </Link>
                            <Link 
                                href="/register" 
                                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100"
                            >
                                Đăng ký
                            </Link>
                        </>
                    ) : auth?.isLoggedIn ? (
                        <>
                            <Link href="/dashboard" className="hover:text-blue-200">
                                Trang cá nhân
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100"
                            >
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                href="/login" 
                                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100"
                            >
                                Đăng nhập
                            </Link>
                            <Link 
                                href="/register" 
                                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100"
                            >
                                Đăng ký
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
