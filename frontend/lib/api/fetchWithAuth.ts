import { getAccessToken, getRefreshToken, logout, refreshToken as apiRefreshToken } from './auth';

// This function will be used to get the AuthContext's refreshAuthToken function
// We need to do this to avoid circular dependencies between auth.ts and AuthContext.tsx
let refreshAuthTokenCallback: (() => Promise<string | null>) | null = null;

export const setRefreshAuthTokenCallback = (callback: () => Promise<string | null>) => {
    refreshAuthTokenCallback = callback;
};

export const fetchWithAuth = async (url: string, options?: RequestInit): Promise<Response> => {
    let accessToken = getAccessToken();
    let headers = new Headers(options?.headers);

    if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
    }

    let response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
        const originalRequest = { url, options: { ...options, headers } }; // Capture original request details

        if (refreshAuthTokenCallback) {
            const newAccessToken = await refreshAuthTokenCallback();
            if (newAccessToken) {
                // Retry the original request with the new access token
                headers.set('Authorization', `Bearer ${newAccessToken}`);
                response = await fetch(url, { ...options, headers });
            } else {
                // If refresh failed, logout
                logout();
                // Re-throw error or return a specific response to indicate unauthenticated state
                throw new Error('Failed to refresh token, user logged out.');
            }
        } else {
            // If no refresh callback is set, just logout
            logout();
            throw new Error('Unauthorized: No refresh token callback available, user logged out.');
        }
    }

    return response;
};