import { CVAnalysisResponse } from '../../types/analysis';
import { fetchWithAuth } from './fetchWithAuth'; // Import the new fetchWithAuth

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8000/api';

export const analyzeCV = async (jobDescription: string): Promise<CVAnalysisResponse | null> => {
  const formData = new FormData();
  formData.append('job_description', jobDescription);

  try {
    // Use fetchWithAuth for authenticated requests
    const response = await fetchWithAuth(`${API_BASE_URL}/analyze-cv/`, {
      method: 'POST',
      // fetchWithAuth will handle the Authorization header
      body: formData,
    });

    if (response.ok) {
      const data: CVAnalysisResponse = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error('CV analysis failed:', errorData);
      return null;
    }
  } catch (error) {
    console.error('Error during CV analysis:', error);
    return null;
  }
};