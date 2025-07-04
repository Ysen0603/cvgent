"use client"
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { AuthContextType, User, UserProfile } from '../types/auth';
import { login as apiLogin, register as apiRegister, refreshToken as apiRefreshToken, logout as apiLogout, getAccessToken, getRefreshToken, fetchCurrentUser } from '../lib/api/auth';
import { setRefreshAuthTokenCallback } from '../lib/api/fetchWithAuth';
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
        
        // Fetch actual user data from backend
        const userData = await fetchCurrentUser();
        if (userData) {
          setUser({ ...userData }); // Ensure a new object reference to trigger updates
        } else {
          // If user fetch fails, clear auth state (fetchWithAuth will handle refresh attempts)
          apiLogout();
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    loadTokens();
    setRefreshAuthTokenCallback(refreshAuthToken); // Set the callback after AuthContext is initialized
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const tokens = await apiLogin(username, password);
    if (tokens) {
      setAccessToken(tokens.access);
      setRefreshToken(tokens.refresh);
      setIsAuthenticated(true);
      
      // Fetch actual user data after successful login
      const userData = await fetchCurrentUser();
      if (userData) {
        setUser({ ...userData }); // Ensure a new object reference to trigger updates
        router.push('/'); // Redirect to home 
        return true;
      }
    }
    return false;
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    const success = await apiRegister(username, password);
    if (success) {
      
      const loggedIn = await login(username, password);
      if (loggedIn) {
        router.push('/'); // Redirect to home 
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
    const latestRefreshToken = getRefreshToken(); // Always get from cookies
    if (latestRefreshToken) {
      const tokens = await apiRefreshToken(latestRefreshToken);
      if (tokens) {
        setAccessToken(tokens.access);
        setRefreshToken(tokens.refresh);
        return tokens.access;
      } else {
        logout(); // Force logout if refresh fails
        return null;
      }
    }
    logout(); // Force logout if no refresh token
    return null;
  };

  // Function to directly update user's CV profile in context
  const updateUserCvProfile = (newProfile: UserProfile | null) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        userprofile: newProfile,
      };
    });
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    accessToken,
    refreshToken,
    login,
    register,
    logout,
    fetchCurrentUser: fetchCurrentUser,
    updateUserCvProfile,
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