import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService";
import { useAsync } from "../../../hooks/useAsync";
import "../auth.css";
import "./ForgotPassword.css";

export default function ForgotPassword() {
	const [step, setStep] = useState(1);
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [showPwd, setShowPwd] = useState(false);
	const [resendTimer, setResendTimer] = useState(60);
	const [canResend, setCanResend] = useState(false);

	const refs = useRef([]);

	const { loading, error, execute, setError } = useAsync();

	const navigate = useNavigate();

	useEffect(() => {
		if (step !== 2) return;

		if (resendTimer === 0) {
			setCanResend(true);
			return;
		}

		const timer = setTimeout(() => {
			setResendTimer((prev) => prev - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [resendTimer, step]);

	const handleEmailSubmit = async (e) => {
		e.preventDefault();

		await execute(async () => {
			await authService.forgotPassword(email);

			setStep(2);

			setResendTimer(60);

			setCanResend(false);
		});
	};

	const handleOtpChange = (index, value) => {
		if (!/^\d?$/.test(value)) return;

		const updated = [...otp];

		updated[index] = value;

		setOtp(updated);

		if (value && index < 5) {
			refs.current[index + 1]?.focus();
		}

		if (error) setError(null);
	};

	const handleOtpKeyDown = (index, e) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			refs.current[index - 1]?.focus();
		}
	};

	const handleOtpPaste = (e) => {
		e.preventDefault();

		const pasted = e.clipboardData
			.getData("text")
			.replace(/\D/g, "")
			.slice(0, 6);

		const updated = [...otp];

		for (let i = 0; i < pasted.length; i++) {
			updated[i] = pasted[i];
		}

		setOtp(updated);

		refs.current[Math.min(pasted.length, 5)]?.focus();
	};

	const handleOtpSubmit = async (e) => {
		e.preventDefault();

		const code = otp.join("");

		if (code.length < 6) {
			setError("Please enter the complete 6-digit OTP.");
			return;
		}

		await execute(async () => {
			await authService.verifyResetOtp(email, code);

			setStep(3);
		});
	};

	const handleResend = async () => {
		if (!canResend) return;

		setCanResend(false);

		setResendTimer(60);

		setOtp(["", "", "", "", "", ""]);

		await execute(() => authService.forgotPassword(email));

		refs.current[0]?.focus();
	};

	const handlePasswordSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirm) {
			setError("Passwords do not match.");
			return;
		}

		await execute(async () => {
			await authService.resetPassword(email, password, confirm);

			navigate("/login", {
				replace: true,
				state: {
					message: "Password reset successful! Please login.",
				},
			});
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

							<span>
								Safe<strong>Go</strong>
							</span>
						</div>

						<h2>Reset Your Password</h2>

						<p>Recover your SafeGo account securely using OTP verification.</p>

						<div className="auth-perks">
							<div className="perk-item">
								<div className="perk-icon">🔐</div>

								<div>
									<h4>Secure Recovery</h4>
									<p>Password reset with OTP verification</p>
								</div>
							</div>

							<div className="perk-item">
								<div className="perk-icon">⚡</div>

								<div>
									<h4>Quick Access</h4>
									<p>Reset your password in minutes</p>
								</div>
							</div>

							<div className="perk-item">
								<div className="perk-icon">📩</div>

								<div>
									<h4>Email Verification</h4>
									<p>OTP delivered instantly to your email</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="auth-right">
					<div className="auth-card glass-card">
						{step === 1 && (
							<>
								<div className="otp-icon-wrap">
									<div className="otp-icon-ring" />
									<i className="fa-solid fa-key" />
								</div>

								<div className="auth-heading">
									<h2>Forgot Password?</h2>

									<p>
										Recover access to your SafeGo account securely using email
										OTP verification.
									</p>
								</div>

								{error && (
									<div className="alert alert-error">
										<i className="fa-solid fa-circle-exclamation" />
										{error}
									</div>
								)}

								<form className="auth-form" onSubmit={handleEmailSubmit}>
									<div className="form-group">
										<label>Email Address</label>

										<div className="input-wrapper modern-input">
											<i className="fa-solid fa-envelope input-icon" />

											<input
												type="email"
												placeholder="Enter your email address"
												value={email}
												onChange={(e) => {
													setEmail(e.target.value);
													if (error) setError(null);
												}}
												required
											/>
										</div>
									</div>

									<button
										type="submit"
										className="auth-submit-btn modern-btn"
										disabled={loading}
									>
										{loading ? (
											<span className="spinner" />
										) : (
											<>
												Send OTP
												<i className="fa-solid fa-paper-plane btn-arrow" />
											</>
										)}
									</button>
								</form>

								<div className="auth-divider">
									<span />
									<p>Secure Password Recovery</p>
									<span />
								</div>

								<div className="back-home">
									<Link to="/login">
										<i className="fa-solid fa-arrow-left-long" />
										Back to Login
									</Link>
								</div>
							</>
						)}

						{step === 2 && (
							<>
								<div className="otp-icon-wrap">
									<div className="otp-icon-ring" />
									<i className="fa-solid fa-envelope-open-text" />
								</div>

								<div className="auth-heading">
									<h2>Verify OTP</h2>

									<p>
										Enter the 6-digit OTP sent to
										<br />
										<strong>{email}</strong>
									</p>
								</div>

								{error && (
									<div className="alert alert-error">
										<i className="fa-solid fa-circle-exclamation" />
										{error}
									</div>
								)}

								<form onSubmit={handleOtpSubmit}>
									<div className="otp-inputs" onPaste={handleOtpPaste}>
										{otp.map((digit, index) => (
											<input
												key={index}
												ref={(el) => (refs.current[index] = el)}
												type="text"
												inputMode="numeric"
												maxLength={1}
												value={digit}
												onChange={(e) => handleOtpChange(index, e.target.value)}
												onKeyDown={(e) => handleOtpKeyDown(index, e)}
												className={`otp-input ${digit ? "filled" : ""}`}
											/>
										))}
									</div>

									<button
										type="submit"
										className="auth-submit-btn modern-btn"
										disabled={loading}
									>
										{loading ? (
											<span className="spinner" />
										) : (
											<>
												Verify OTP
												<i className="fa-solid fa-check btn-arrow" />
											</>
										)}
									</button>
								</form>

								<div className="otp-resend">
									{canResend ? (
										<button className="resend-btn" onClick={handleResend}>
											<i className="fa-solid fa-rotate-right" />
											Resend OTP
										</button>
									) : (
										<p>
											Resend OTP in
											<strong> {resendTimer}s</strong>
										</p>
									)}
								</div>

								<div className="back-home">
									<button
										className="resend-btn"
										onClick={() => {
											setStep(1);
											setOtp(["", "", "", "", "", ""]);
											setError(null);
										}}
									>
										← Change Email
									</button>
								</div>
							</>
						)}

						{step === 3 && (
							<>
								<div className="otp-icon-wrap otp-section">
									<div className="otp-icon-ring" />
									<i className="fa-solid fa-lock" />
								</div>

								<div className="auth-heading">
									<h2>Create New Password</h2>

									<p>
										OTP verified successfully. Create your new password
										securely.
									</p>
								</div>

								{error && (
									<div className="alert alert-error">
										<i className="fa-solid fa-circle-exclamation" />
										{error}
									</div>
								)}

								<form className="auth-form" onSubmit={handlePasswordSubmit}>
									<div className="form-group">
										<label>New Password</label>

										<div className="input-wrapper modern-input">
											<i className="fa-solid fa-lock input-icon" />

											<input
												type={showPwd ? "text" : "password"}
												placeholder="Minimum 8 characters"
												value={password}
												onChange={(e) => {
													setPassword(e.target.value);
													if (error) setError(null);
												}}
												required
												minLength={8}
											/>

											<button
												type="button"
												className="eye-btn"
												onClick={() => setShowPwd(!showPwd)}
											>
												<i
													className={`fa-solid ${
														showPwd ? "fa-eye-slash" : "fa-eye"
													}`}
												/>
											</button>
										</div>
									</div>

									<div className="form-group">
										<label>Confirm Password</label>

										<div className="input-wrapper modern-input">
											<i className="fa-solid fa-lock input-icon" />

											<input
												type="password"
												placeholder="Repeat password"
												value={confirm}
												onChange={(e) => {
													setConfirm(e.target.value);
													if (error) setError(null);
												}}
												required
											/>
										</div>
									</div>

									<button
										type="submit"
										className="auth-submit-btn"
										disabled={loading}
									>
										{loading ? (
											<span className="spinner" />
										) : (
											<>
												Reset Password
												<i className="fa-solid fa-check btn-arrow" />
											</>
										)}
									</button>
								</form>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
