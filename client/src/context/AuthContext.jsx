import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("sg_token");
      if (!token) { setLoading(false); return; }
      const data = await authService.getMe();
      setUser(data.user);
    } catch {
      localStorage.removeItem("sg_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadUser(); }, [loadUser]);

  const login = async (credentials, role) => {
    setError(null);
    const data = await authService.login(credentials, role);
    localStorage.setItem("sg_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (formData, role) => {
    setError(null);
    const data = await authService.register(formData, role);
    return data;
  };

  const verifyOtp = async (payload) => {
    const data = await authService.verifyOtp(payload);
    localStorage.setItem("sg_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("sg_token");
    setUser(null);
  };

  const googleAuth = async (tokenId, role) => {
    const data = await authService.googleAuth(tokenId, role);
    localStorage.setItem("sg_token", data.token);
    setUser(data.user);
    return data.user;
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, verifyOtp, logout, googleAuth, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
