// API Configuration using environment variable
const getApiUrl = () => {
  return process.env.REACT_APP_API_URL || 'http://localhost:5001';
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
