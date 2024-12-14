"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthUser {
  zid: string;
  admin: boolean;
}

interface JWTPayload {
  zid: string;
  admin: boolean;
  exp: number;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const decodeAndSetUser = (token: string) => {
    try {
      const decoded = jwtDecode<JWTPayload>(token);
      setUser({
        zid: decoded.zid,
        admin: decoded.admin,
      });
    } catch (error) {
      console.error("Failed to decode token:", error);
      logout();
    }
  };

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    decodeAndSetUser(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      login(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
