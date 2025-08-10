import axios from "axios";
import { getToken, removeToken } from "../services/auth";

const apiClient = axios.create({
  baseURL: "http://62.60.213.13/api",
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default apiClient;