import { User, UserLogin } from "@/types/users";

class AuthService {
  async login(credentials: UserLogin) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      return data; // Return the token and user data
    } catch (error) {
      throw error;
    }
  }

  async register(userData: User) {
    try {
      const formData = new FormData();
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("email", userData.email);
      formData.append("school", userData.school);
      formData.append("password", userData.password);
      formData.append("confirmPassword", userData.confirmPassword);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      return data; // Return the token and user data
    } catch (error) {
      throw error;
    }
  }

  async getProfile() {
    try {
      const response = await fetch("/api/auth/getUser");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch user");
      }

      return data.user;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
