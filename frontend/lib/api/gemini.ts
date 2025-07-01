import { GeminiApiKeyResponse, GeminiApiKeyPayload } from '../../types/gemini';
import { fetchWithAuth } from './fetchWithAuth'; // Import the new fetchWithAuth

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8000/api';

export const getGeminiApiKey = async (): Promise<GeminiApiKeyResponse | null> => {
  try {
    // Use fetchWithAuth for authenticated requests
    const response = await fetchWithAuth(`${API_BASE_URL}/gemini-key/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
  try {
    // Use fetchWithAuth for authenticated requests
    const payload: GeminiApiKeyPayload = { api_key: apiKey };
    const response = await fetchWithAuth(`${API_BASE_URL}/gemini-key/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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