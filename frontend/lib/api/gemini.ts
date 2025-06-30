import { getAccessToken } from './auth';
import { GeminiApiKeyResponse, GeminiApiKeyPayload } from '../../types/gemini';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8000/api';

export const getGeminiApiKey = async (): Promise<GeminiApiKeyResponse | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error('No access token available for Gemini API key retrieval.');
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/gemini-key/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data: GeminiApiKeyResponse = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error('Failed to fetch Gemini API key:', errorData);
      return null;
    }
  } catch (error) {
    console.error('Error fetching Gemini API key:', error);
    return null;
  }
};

export const setGeminiApiKey = async (apiKey: string): Promise<boolean> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error('No access token available for setting Gemini API key.');
    return false;
  }

  try {
    const payload: GeminiApiKeyPayload = { api_key: apiKey };
    const response = await fetch(`${API_BASE_URL}/gemini-key/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return true;
    } else {
      const errorData = await response.json();
      console.error('Failed to set Gemini API key:', errorData);
      return false;
    }
  } catch (error) {
    console.error('Error setting Gemini API key:', error);
    return false;
  }
};