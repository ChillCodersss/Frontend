import axios from "axios";
import { getToken, removeToken } from "../services/auth";

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Add request interceptor to include token in headers
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (token expired)
      removeToken();
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default apiClient;