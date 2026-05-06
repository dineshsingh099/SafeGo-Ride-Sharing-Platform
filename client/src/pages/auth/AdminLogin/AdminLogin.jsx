import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";
import { useAsync } from "../../../hooks/useAsync";
import "../auth.css";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error, execute } = useAsync();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await execute(async () => {
      // Backend: POST /users/login (admin bhi same route se login karta hai)
      // Cookie set hogi, phir profile fetch karo
      await authService.login(formData);
      const profile = await authService.getProfile();
      if (profile.role !== "admin") {
        await authService.logout();
        throw new Error("Access denied. Admin credentials required.");
      }
      setUser(profile);
      navigate("/admin/dashboard", { replace: true });
    });
  };

  return (
    <div className="auth-page admin-login-page">
      <div className="admin-login-center">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-shield">
              <i className="fa-solid fa-shield-halved" />
            </div>
            <h2>Admin Portal</h2>
            <p>Restricted access — authorized personnel only</p>
          </div>

          {error && (
            <div className="alert alert-error">
              <i className="fa-solid fa-circle-exclamation" />{error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Admin Email</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-envelope input-icon" />
                <input type="email" name="email" placeholder="admin@safego.com"
                  value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Admin Password</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-lock input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password" placeholder="Enter admin password"
                  value={formData.password} onChange={handleChange} required
                />
                <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>
            </div>
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="spinner" /> :
                <>Secure Login <i className="fa-solid fa-arrow-right-to-bracket btn-arrow" /></>}
            </button>
          </form>

          <div className="admin-warning">
            <i className="fa-solid fa-triangle-exclamation" />
            <span>Unauthorized access attempts are logged and reported.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
