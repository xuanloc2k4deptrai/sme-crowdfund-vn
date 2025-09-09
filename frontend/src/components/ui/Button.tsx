import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

const Button: React.FC<Props> = ({ 
  variant = "primary", 
  size = "md", 
  children, 
  className = "", 
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  ...rest 
}) => {
  const sizes: Record<string,string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };
  
  const variants: Record<string,string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md",
    secondary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 shadow-md",
    accent: "bg-yellow-400 text-blue-900 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 shadow-md",
    light: "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-30 shadow-sm",
    outline: "bg-transparent text-blue-600 border border-blue-300 hover:bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-30",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-30"
  };
  
  const loadingClassName = loading ? "opacity-80 cursor-not-allowed" : "";
  const disabledClassName = disabled ? "opacity-60 cursor-not-allowed hover:bg-opacity-100" : "";
  
  return (
    <button 
      {...rest} 
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-lg font-medium shadow-sm transition-all duration-200 ease-in-out ${sizes[size]} ${variants[variant]} ${loadingClassName} ${disabledClassName} ${className}`}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {icon && iconPosition === "left" && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === "right" && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;