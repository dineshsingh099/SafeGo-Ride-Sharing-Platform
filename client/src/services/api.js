import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sg_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response?.data?.message || "An unexpected error occurred.";
    if (err.response?.status === 401) {
      localStorage.removeItem("sg_token");
      window.location.href = "/login";
    }
    return Promise.reject(new Error(message));
  }
);

export default api;
