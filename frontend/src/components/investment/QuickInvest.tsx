import React, { useState } from 'react';
import PaymentModal from '../payment/PaymentModal';
import { Campaign } from '../../types';

interface QuickInvestProps {
  campaign: Campaign;
  user: {
    id: string;
    email: string;
    name: string;
  };
  onInvestmentSuccess?: (transactionId: string, campaignId: number, amount: number) => void;
  buttonText?: string;
  buttonClass?: string;
}

const QuickInvest: React.FC<QuickInvestProps> = ({
  campaign,
  user,
  onInvestmentSuccess,
  buttonText = "Đầu tư ngay",
  buttonClass = "bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePaymentSuccess = (transactionId: string) => {
    setIsSuccess(true);
    setMessage(`✅ Đầu tư thành công! Mã GD: ${transactionId.slice(0, 8)}...`);
    setShowMessage(true);
    
    if (onInvestmentSuccess) {
      onInvestmentSuccess(transactionId, campaign.id, 1000000); // Default amount
    }
    
    // Hide message after 5 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  const handlePaymentError = (error: string) => {
    setIsSuccess(false);
    setMessage(`❌ ${error}`);
    setShowMessage(true);
    
    // Hide message after 5 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  return (
    <>
      {/* Success/Error Message */}
      {showMessage && (
        <div className={`fixed top-4 right-4 z-50 p-3 rounded-lg shadow-lg max-w-sm text-sm ${
          isSuccess 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* Quick Invest Button */}
      <button
        onClick={() => setIsPaymentModalOpen(true)}
        className={buttonClass}
        disabled={campaign.status !== 'active'}
      >
        {campaign.status === 'active' ? (
          <>
            🔒 {buttonText}
          </>
        ) : (
          'Dự án đã đóng'
        )}
      </button>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        campaign={campaign}
        user={user}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
      />
    </>
  );
};

export default QuickInvest;