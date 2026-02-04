import apiClient from "./apiClient";

const AUTH_API_BASE_URL = 'http://localhost:8081/api/auth';

export const loginUser = (payload) => apiClient.post(AUTH_API_BASE_URL + '/login', payload);

export const registerUser = (payload) => apiClient.post(AUTH_API_BASE_URL + '/register', payload);
