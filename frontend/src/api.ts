import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a Network Error and we are falling back to localhost in production
    if (error.message === 'Network Error' && apiURL.includes('localhost') && window.location.hostname !== 'localhost') {
      error.message = 'Backend Connection Failed: The frontend is attempting to connect to a local backend (localhost). Please configure the VITE_API_URL environment variable in your Vercel Dashboard to point to your live backend URL (e.g., Railway) and trigger a redeploy.';
    }
    return Promise.reject(error);
  }
);

export default api;
