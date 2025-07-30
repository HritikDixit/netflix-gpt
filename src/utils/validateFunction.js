export const checkValidateFunction = (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  if (!emailRegex) {
    return "Invalid email format";
  }

  if (!passwordRegex) {
    return "Password must be at least 8 characters long and contain at least one letter and one number";
  }
};
