import axios from "axios";
import { getAuthToken } from "./AuthStorage";

const apiClient = axios.create();

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
