import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Replace with your actual Laravel backend URL
});

// You can add interceptors here if needed, e.g., for authentication

export default api;