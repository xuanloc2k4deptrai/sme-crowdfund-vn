import React from 'react';
import Head from 'next/head';
import RegisterForm from '../src/components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Đăng ký - SME Crowdfunding</title>
        <meta name="description" content="Tạo tài khoản mới trên nền tảng gọi vốn SME" />
      </Head>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;