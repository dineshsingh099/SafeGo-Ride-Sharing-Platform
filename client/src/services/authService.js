import api from "./api";

// Backend routes (server_fixed ke according):
// POST /users/register         — signup
// POST /users/send-otp         — resend OTP (registration)
// POST /users/verify-otp       — OTP verify (registration)
// POST /users/login            — login
// POST /users/refresh-token    — token refresh
// POST /users/logout           — logout
// GET  /users/profile          — apna profile
// POST /users/forgot-password  — OTP bhejo reset ke liye
// POST /users/verify-reset-otp — reset OTP verify karo (Step 1)
// POST /users/reset-password   — naya password set karo (Step 2)

export const authService = {
  // --- Registration ---
  register: (formData) =>
    api.post("/users/register", formData),

  resendOtp: (email) =>
    api.post("/users/send-otp", { email }),

  verifyOtp: (email, otp) =>
    api.post("/users/verify-otp", { email, otp }),

  // --- Login / Logout ---
  login: (credentials) =>
    api.post("/users/login", credentials),

  logout: () =>
    api.post("/users/logout"),

  refreshToken: () =>
    api.post("/users/refresh-token"),

  // --- Profile ---
  getProfile: () =>
    api.get("/users/profile"),

  // --- Password Reset (2-step) ---
  forgotPassword: (email) =>
    api.post("/users/forgot-password", { email }),

  verifyResetOtp: (email, otp) =>
    api.post("/users/verify-reset-otp", { email, otp }),

  resetPassword: (email, new_password, confirm_password) =>
    api.post("/users/reset-password", { email, new_password, confirm_password }),
};
