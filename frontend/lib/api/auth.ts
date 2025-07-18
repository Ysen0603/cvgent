import Cookies from 'js-cookie';
import { AuthTokens, User } from '../../types/auth';
import { fetchWithAuth } from './fetchWithAuth'; // Import the new fetchWithAuth

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8000/api';

export const register = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      return true;
    } else {
      const errorData = await response.json();
      console.error('Registration failed:', errorData);
      return false;
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return false;
  }
};

export const login = async (username: string, password: string): Promise<AuthTokens | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data: AuthTokens = await response.json();
      Cookies.set('accessToken', data.access, { expires: 1/24 }); // Expires in 1 hour
      Cookies.set('refreshToken', data.refresh, { expires: 7 }); // Expires in 7 days
      return data;
    } else {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
      return null;
    }
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
};

export const refreshToken = async (refresh: string): Promise<AuthTokens | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }),
    });

    if (response.ok) {
      const data: AuthTokens = await response.json();
      Cookies.set('accessToken', data.access, { expires: 1/24 }); // Expires in 1 hour
      Cookies.set('refreshToken', data.refresh, { expires: 7 }); // Expires in 7 days
      return data;
    } else {
      const errorData = await response.json();
      console.error('Token refresh failed:', errorData);
      return null;
    }
  } catch (error) {
    console.error('Error during token refresh:', error);
    return null;
  }
};

export const logout = (): void => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  // Optionally, invalidate token on backend if a logout endpoint exists
};

// Helper to get current access token
export const getAccessToken = (): string | null => {
    return Cookies.get('accessToken') || null;
};

// Helper to get current refresh token
export const getRefreshToken = (): string | null => {
    return Cookies.get('refreshToken') || null;
};

export const fetchCurrentUser = async (): Promise<User | null> => {
    // Use fetchWithAuth for fetching current user
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/me/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch current user');
            return null;
        }
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};

export const updateUserProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/me/`, {
            method: 'PATCH', // Use PATCH for partial updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            return true;
        } else {
            const errorData = await response.json();
            console.error('Failed to update user profile:', errorData);
            return false;
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        return false;
    }
};