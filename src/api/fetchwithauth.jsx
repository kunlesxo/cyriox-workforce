// Utility to handle fetch with access and refresh token flow
export const fetchWithAuth = async (url, options = {}) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!accessToken || !refreshToken) {
    throw new Error('No tokens available');
  }

  // Set authorization header
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.ok) {
      return response; // If the response is successful, return it
    } else if (response.status === 401) {
      // If we receive 401, attempt to refresh the access token using the refresh token
      const refreshResponse = await refreshAccessToken(refreshToken);

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        // Save the new access token and retry the original request
        localStorage.setItem('accessToken', data.access);
        return fetchWithAuth(url, options); // Retry the original request
      } else {
        throw new Error('Session expired, please log in again');
      }
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch with auth');
  }
};

// Function to refresh the access token using the refresh token
const refreshAccessToken = async (refreshToken) => {
  const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });

  return response;
};
