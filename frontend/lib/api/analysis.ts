import { getAccessToken } from './auth';
import { CVAnalysisResponse } from '../../types/analysis';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8000/api';

export const analyzeCV = async (cvFile: File, jobDescription: string): Promise<CVAnalysisResponse | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error('No access token available for CV analysis.');
    return null;
  }

  const formData = new FormData();
  formData.append('cv_file', cvFile);
  formData.append('job_description', jobDescription);

  try {
    const response = await fetch(`${API_BASE_URL}/analyze-cv/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        // 'Content-Type': 'multipart/form-data' is automatically set by fetch when using FormData
      },
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