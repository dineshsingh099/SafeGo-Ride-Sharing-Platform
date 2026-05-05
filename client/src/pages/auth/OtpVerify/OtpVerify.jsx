import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useAsync } from "../../../hooks/useAsync";
import { authService } from "../../../services/authService";
import "../auth.css";
import "./OtpVerify.css";

export default function OtpVerify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const refs = useRef([]);
  const { verifyOtp } = useAuth();
  const { loading, error, execute, setError } = useAsync();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const role = location.state?.role || "user";

  useEffect(() => {
    if (!email) navigate("/signup");
  }, [email, navigate]);

  useEffect(() => {
    if (resendTimer === 0) { setCanResend(true); return; }
    const t = setTimeout(() => setResendTimer((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) refs.current[index + 1]?.focus();
    if (error) setError(null);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    for (let i = 0; i < paste.length; i++) next[i] = paste[i];
    setOtp(next);
    refs.current[Math.min(paste.length, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter the complete 6-digit OTP."); return; }
    await execute(async () => {
      const user = await verifyOtp({ email, otp: code, role });
      const dest = user.role === "driver" ? "/driver/dashboard" : "/user/dashboard";
      navigate(dest, { replace: true });
    });
  };

  const handleResend = async () => {
    if (!canResend) return;
    setCanResend(false);
    setResendTimer(60);
    setOtp(["", "", "", "", "", ""]);
    await execute(() => authService.resendOtp(email));
    refs.current[0]?.focus();
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-glow" />
      <div className="auth-bg-glow-2" />
      <div className="otp-center">
        <div className="otp-card">
          <div className="otp-icon-wrap">
            <i className="fa-solid fa-envelope-open-text" />
          </div>
          <h2>Verify Your Email</h2>
          <p>We sent a 6-digit OTP to<br /><strong>{email}</strong></p>

          {error && (
            <div className="alert alert-error">
              <i className="fa-solid fa-circle-exclamation" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="otp-inputs" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (refs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`otp-input ${digit ? "filled" : ""}`}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : <>Verify OTP <i className="fa-solid fa-check" /></>}
            </button>
          </form>

          <div className="otp-resend">
            {canResend ? (
              <button className="resend-btn" onClick={handleResend}>
                <i className="fa-solid fa-rotate-right" /> Resend OTP
              </button>
            ) : (
              <p>Resend OTP in <strong>{resendTimer}s</strong></p>
            )}
          </div>

          <div className="back-home"><Link to="/signup">← Change Email</Link></div>
        </div>
      </div>
    </div>
  );
}
