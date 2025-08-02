// API Configuration with hardcoded value
const getApiUrl = () => {
  return 'https://intern-7w8r.onrender.com'; // Value is now directly here
};

export const API_BASE_URL = getApiUrl();

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  DASHBOARD: (userId) => `${API_BASE_URL}/api/dashboard/${userId}`,
  LEADERBOARD: `${API_BASE_URL}/api/leaderboard`,
  USERS: `${API_BASE_URL}/api/users`,
  HEALTH: `${API_BASE_URL}/api/health`,
};