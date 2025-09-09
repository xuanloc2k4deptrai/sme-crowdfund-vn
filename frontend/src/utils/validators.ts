export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
    const regex = /^\+84[1-9]\d{8}$/; // Vietnam phone number format
    return regex.test(phone);
};

export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
};

export const validateFundingAmount = (amount: number): boolean => {
    return amount > 0;
};

export const validateDescriptionLength = (description: string, minLength: number = 20): boolean => {
    return description.length >= minLength;
};