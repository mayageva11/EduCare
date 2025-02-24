export interface UserLogin {
  email: string;
  password: string;
}

//interface for register
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  certificate: File | null;
}

// Interface for user data without sensitive information
export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}
