// Utility function for consistent number formatting across server and client
export const formatIndianNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }).format(num);
};

// Utility function for currency formatting
export const formatIndianCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(num);
};
