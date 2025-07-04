import { fetchWithAuth } from './fetchWithAuth';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const getUserCv = async () => {
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/user-cv/`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user CV:', error);
        throw error;
    }
};

export const uploadCv = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('cv_file', file);

        const response = await fetchWithAuth(`${API_BASE_URL}/user-cv/`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading CV:', error);
        throw error;
    }
};

export const deleteCv = async () => {
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/user-cv/`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return null; // Indicate successful deletion
    } catch (error) {
        console.error('Error deleting CV:', error);
        throw error;
    }
};