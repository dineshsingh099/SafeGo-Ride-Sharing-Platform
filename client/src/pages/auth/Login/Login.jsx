import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useAsync } from "../../../hooks/useAsync";
import "../auth.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const { loading, error, execute, setError } = useAsync();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await execute(async () => {
      const user = await login(formData);
      const from = location.state?.from?.pathname;
      if (from) { navigate(from, { replace: true }); return; }
      const dest =
        user.role === "admin" ? "/admin/dashboard" :
        user.role === "driver" ? "/driver/dashboard" :
        "/user/dashboard";
      navigate(dest, { replace: true });
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-glow" />
      <div className="auth-bg-glow-2" />
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-left-content">
            <div className="auth-brand">
              <div className="auth-brand-dot" />
              <span>Safe<strong>Go</strong></span>
            </div>
            <h2>Welcome Back to SafeGo</h2>
            <p>Your trusted ride-sharing platform — safe, reliable, and always on time.</p>
            <div className="auth-perks">
              <div className="perk-item">
                <div className="perk-icon">🛡️</div>
                <div><h4>Safe & Verified</h4><p>Every driver background checked</p></div>
              </div>
              <div className="perk-item">
                <div className="perk-icon">⚡</div>
                <div><h4>Instant Booking</h4><p>Confirm rides in under 30 seconds</p></div>
              </div>
              <div className="perk-item">
                <div className="perk-icon">📍</div>
                <div><h4>Live Tracking</h4><p>Real-time GPS updates always</p></div>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <div className="auth-card-header">
              <h3>Sign In</h3>
              <p>Access your SafeGo account</p>
            </div>

            {error && (
              <div className="alert alert-error" style={{ marginBottom: 16 }}>
                <i className="fa-solid fa-circle-exclamation" />{error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-envelope input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-lock input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                  </button>
                </div>
                <div className="forgot-row">
                  <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="spinner" /> : <>Sign In <i className="fa-solid fa-arrow-right btn-arrow" /></>}
              </button>
            </form>

            <div className="auth-footer-text">
              <p>Don't have an account? <Link to="/signup">Create one free</Link></p>
            </div>
            <div className="back-home"><Link to="/">← Back to Home</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
}
