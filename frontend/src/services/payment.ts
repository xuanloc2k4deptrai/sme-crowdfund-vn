import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface PaymentData {
    campaignId: number;
    amount: number;
    userId: number;
    paymentMethod: string;
    [key: string]: any;
}

export const initiatePayment = async (paymentData: PaymentData) => {
    try {
        const response = await axios.post(`${API_URL}/payments/initiate`, paymentData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Payment initiation failed');
    }
};

export const confirmPayment = async (paymentId: string) => {
    try {
        const response = await axios.post(`${API_URL}/payments/confirm`, { paymentId });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Payment confirmation failed');
    }
};

export const getPaymentStatus = async (paymentId: string) => {
    try {
        const response = await axios.get(`${API_URL}/payments/status/${paymentId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to retrieve payment status');
    }
}

function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
}

export default useAuth;