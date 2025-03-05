export interface UserLogin {
  email: string;
  password: string;
}

//interface for register
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  school: string;
  password: string;
  confirmPassword: string;
}

// Interface for user data without sensitive information
export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  school: string;
}
