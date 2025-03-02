import { User, UserLogin } from '@/types/users';
class AuthService {
  async login(credentials: UserLogin) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
  async register(userData: User) {
    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Add text fields
      formData.append('firstName', userData.firstName);
      formData.append('lastName', userData.lastName);
      formData.append('email', userData.email);
      formData.append('school', userData.school);
      formData.append('password', userData.password);
      formData.append('confirmPassword', userData.confirmPassword);

      // Send request
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
