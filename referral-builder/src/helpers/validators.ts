export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidNumber = (phoneNumber: string) => {
  return /^\d{4}-\d{3}-\d{3}$/.test(phoneNumber);
};
