import React, { useEffect, useState } from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: React.ReactNode;
  closeOnClickOutside?: boolean;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  footer,
  closeOnClickOutside = true,
  showCloseButton = true
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleOutsideClick = () => {
    if (closeOnClickOutside) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen && !isClosing) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  const animationClass = isClosing 
    ? 'opacity-0 scale-95' 
    : 'opacity-100 scale-100';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-6">
      <div 
        className={`absolute inset-0 bg-navy-900 bg-opacity-70 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`} 
        onClick={handleOutsideClick} 
      />
      
      <div 
        className={`relative bg-white rounded-xl shadow-2xl z-10 w-full ${sizeClasses[size]} transform transition-all duration-200 ${animationClass} overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-xl font-bold text-navy-800">{title}</h3>
          {showCloseButton && (
            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-navy-600 focus:outline-none transition-colors duration-200"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Body */}
        <div className="p-5 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        
        {/* Footer */}
        {footer ? (
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            {footer}
          </div>
        ) : (
          <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
            <Button variant="outline" onClick={handleClose}>
              Đóng
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;