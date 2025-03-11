"use client";

import { createContext, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string, userData: any) => void;
  register: (token: string, userData: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // Ensure client-side only
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Mark that the component has mounted on client
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    localStorage.removeItem("ally-supports-cache");

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        setUser(null);
      }
    }
  }, []);

  const login = (newToken: string, userData: any) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const register = (newToken: string, userData: any) => {
    login(newToken, userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Memoize context value to prevent unnecessary re-renders
  const authContextValue = useMemo(
    () => ({ user, token, login, register, logout }),
    [user, token]
  );

  // Prevent hydration errors by only rendering client-side
  if (!isClient) {
    return null; // Render nothing until hydration completes
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
