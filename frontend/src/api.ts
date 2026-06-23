import axios from 'axios';

console.log("MODE:", import.meta.env.MODE);
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

// Prevent fallback to localhost in production environments
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const defaultApiUrl = isProduction 
  ? 'https://ai-powered-grocery-recommendation.onrender.com' 
  : 'http://localhost:8000';

const apiURL = import.meta.env.VITE_API_URL || defaultApiUrl;

const api = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // We removed the localhost warning override so true CORS/Network errors are visible
    return Promise.reject(error);
  }
);

export default api;
