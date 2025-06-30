"use client"
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { AuthContextType, AuthTokens, User } from '../types/auth';
import { login as apiLogin, register as apiRegister, refreshToken as apiRefreshToken, logout as apiLogout, getAccessToken, getRefreshToken } from '../lib/api/auth';
import { useRouter } from 'next/navigation'; // Import useRouter

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const loadTokens = async () => {
      const storedAccessToken = getAccessToken();
      const storedRefreshToken = getRefreshToken();

      if (storedAccessToken && storedRefreshToken) {
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
        setIsAuthenticated(true);
        // In a real app, you'd fetch user details from an endpoint using the access token
        // For now, we'll use a placeholder or decode from token if possible
        setUser({ id: 1, username: 'testuser' }); // Placeholder user
      }
      setLoading(false);
    };
    loadTokens();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const tokens = await apiLogin(username, password);
    if (tokens) {
      setAccessToken(tokens.access);
      setRefreshToken(tokens.refresh);
      setIsAuthenticated(true);
      setUser({ id: 1, username: username }); // Placeholder user
      router.push('/'); // Redirect to home or dashboard after login
      return true;
    }
    return false;
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    const success = await apiRegister(username, password);
    if (success) {
      // Optionally auto-login after registration
      const loggedIn = await login(username, password);
      if (loggedIn) {
        router.push('/'); // Redirect to home or dashboard after successful registration and login
      }
      return loggedIn;
    }
    return false;
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    router.push('/login'); // Redirect to login page after logout
  };

  // Function to refresh token (can be called by an interceptor or manually)
  const refreshAuthToken = async () => {
    if (refreshToken) {
      const newAccessToken = await apiRefreshToken(refreshToken);
      if (newAccessToken) {
        setAccessToken(newAccessToken);
        return newAccessToken;
      } else {
        logout(); // Force logout if refresh fails
        return null;
      }
    }
    logout(); // Force logout if no refresh token
    return null;
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    accessToken,
    refreshToken,
    login,
    register,
    logout,
  };

  if (loading) {
    return <div>Loading authentication...</div>; // Or a proper loading spinner component
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};