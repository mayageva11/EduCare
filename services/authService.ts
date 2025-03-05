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

      // Store token in localStorage if immediate login is desired
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userID', JSON.stringify(data.userID));
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
      formData.append('password', userData.password);
      formData.append('confirmPassword', userData.confirmPassword);

      // Add certificate file if it exists
      if (userData.certificate) {
        formData.append('certificate', userData.certificate);
      }

      // Send request
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store token in localStorage if immediate login is desired
      if (data.token) {
        localStorage.setItem('token', data.token);    
        localStorage.setItem('userID', JSON.stringify(data.userID));
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getProfile() {
    try {
      const response = await fetch('/api/auth/getUser');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch user');
      }

      return data.user;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
