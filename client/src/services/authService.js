import api from "./api";

export const authService = {
  login: (credentials, role) => api.post("/auth/login", { ...credentials, role }),
  register: (formData, role) => api.post("/auth/register", { ...formData, role }),
  verifyOtp: (payload) => api.post("/auth/verify-otp", payload),
  resendOtp: (email) => api.post("/auth/resend-otp", { email }),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) => api.post("/auth/reset-password", { token, password }),
  getMe: () => api.get("/auth/me"),
  googleAuth: (tokenId, role) => api.post("/auth/google", { tokenId, role }),
  adminLogin: (credentials) => api.post("/auth/admin/login", credentials),
  updateProfile: (data) => api.put("/auth/profile", data),
  changePassword: (data) => api.put("/auth/change-password", data),
};
