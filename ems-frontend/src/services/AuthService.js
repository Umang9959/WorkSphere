import apiClient from "./apiClient";

const API_BASE_URL = 'https://worksphere-1-irwl.onrender.com';
const AUTH_API_BASE_URL = `${API_BASE_URL}/api/auth`;

export const loginUser = (payload) => apiClient.post(AUTH_API_BASE_URL + '/login', payload);

export const registerUser = (payload) => apiClient.post(AUTH_API_BASE_URL + '/register', payload);
