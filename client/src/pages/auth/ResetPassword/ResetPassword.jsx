import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../../../services/authService";
import { useAsync } from "../../../hooks/useAsync";
import "../auth.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [done, setDone] = useState(false);
  const { loading, error, execute, setError } = useAsync();
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    await execute(async () => {
      await authService.resetPassword(token, password);
      setDone(true);
      setTimeout(() => navigate("/login"), 3000);
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-glow" />
      <div className="auth-bg-glow-2" />
      <div className="otp-center">
        <div className="otp-card">
          {!done ? (
            <>
              <div className="otp-icon-wrap">
                <i className="fa-solid fa-lock" />
              </div>
              <h2>Reset Password</h2>
              <p>Enter your new password below.</p>

              {error && (
                <div className="alert alert-error">
                  <i className="fa-solid fa-circle-exclamation" />{error}
                </div>
              )}

              <form className="auth-form" onSubmit={handleSubmit} style={{ textAlign: "left" }}>
                <div className="form-group">
                  <label>New Password</label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-lock input-icon" />
                    <input type={showPwd ? "text" : "password"} placeholder="Min 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                    <button type="button" className="eye-btn" onClick={() => setShowPwd(!showPwd)}>
                      <i className={`fa-solid ${showPwd ? "fa-eye-slash" : "fa-eye"}`} />
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-lock input-icon" />
                    <input type="password" placeholder="Repeat new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
                  </div>
                </div>
                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? <span className="spinner" /> : <>Reset Password <i className="fa-solid fa-check btn-arrow" /></>}
                </button>
              </form>
              <div className="back-home"><Link to="/login">← Back to Login</Link></div>
            </>
          ) : (
            <>
              <div className="otp-icon-wrap" style={{ background: "var(--success-light)", color: "var(--success)" }}>
                <i className="fa-solid fa-circle-check" />
              </div>
              <h2>Password Reset!</h2>
              <p>Your password has been reset successfully. Redirecting to login...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
