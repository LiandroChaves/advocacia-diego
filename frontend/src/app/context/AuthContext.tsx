import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; name: string; password?: string; adminPassword?: string }) => Promise<void>;
  logout: () => void;
  verifyToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const verifyToken = useCallback(async () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      logout();
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/sessions/verify`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      logout();
    }
  }, [apiUrl, logout]);

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token, verifyToken]);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${apiUrl}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao fazer login');
    }

    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const register = async (userData: { email: string; name: string; password?: string; adminPassword?: string }) => {
    const response = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao registrar');
    }
  };

  return (
    <AuthContext.Provider value={{
      token,
      user,
      isAuthenticated: !!token,
      login,
      register,
      logout,
      verifyToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
