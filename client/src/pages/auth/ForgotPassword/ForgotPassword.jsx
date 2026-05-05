import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../../services/authService";
import { useAsync } from "../../../hooks/useAsync";
import "../auth.css";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { loading, error, execute } = useAsync();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await execute(async () => {
      await authService.forgotPassword(email);
      setSent(true);
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-glow" />
      <div className="auth-bg-glow-2" />
      <div className="otp-center">
        <div className="otp-card">
          {!sent ? (
            <>
              <div className="otp-icon-wrap">
                <i className="fa-solid fa-key" />
              </div>
              <h2>Forgot Password?</h2>
              <p>Enter your email and we'll send you a link to reset your password.</p>

              {error && (
                <div className="alert alert-error">
                  <i className="fa-solid fa-circle-exclamation" />{error}
                </div>
              )}

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group" style={{ textAlign: "left" }}>
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-envelope input-icon" />
                    <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? <span className="spinner" /> : <>Send Reset Link <i className="fa-solid fa-paper-plane btn-arrow" /></>}
                </button>
              </form>
              <div className="back-home"><Link to="/login">← Back to Login</Link></div>
            </>
          ) : (
            <>
              <div className="otp-icon-wrap" style={{ background: "var(--success-light)", color: "var(--success)" }}>
                <i className="fa-solid fa-circle-check" />
              </div>
              <h2>Email Sent!</h2>
              <p>We've sent a password reset link to <strong>{email}</strong>. Check your inbox and follow the instructions.</p>
              <div className="back-home"><Link to="/login">← Back to Login</Link></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
