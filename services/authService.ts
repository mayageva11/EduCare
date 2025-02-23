import { UserLogin } from '@/types/users';
  class AuthService {
    async login(credentials: UserLogin) {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
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
  }
  
  export const authService = new AuthService();