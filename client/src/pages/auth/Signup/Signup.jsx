import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useAsync } from "../../../hooks/useAsync";
import "../auth.css";

export default function Signup() {
	const [role, setRole] = useState("user");
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirm: "",
		licenseNo: "",
		vehicleType: "",
		vehicleNo: "",
	});
	const { register } = useAuth();
	const { loading, error, execute, setError } = useAsync();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (error) setError(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await execute(async () => {
			await register(formData, role);
			navigate("/verify-otp", { state: { email: formData.email, role } });
		});
	};

	return (
		<div className="auth-page">
			<div className="auth-bg-glow" />
			<div className="auth-bg-glow-2" />
			<div className="auth-container signup-layout">
				<div className="auth-left">
					<div className="auth-left-content">
						<div className="auth-brand">
							<div className="auth-brand-dot" />
							<span>
								Safe<strong>Go</strong>
							</span>
						</div>
						<h2>
							{role === "user"
								? "Join SafeGo as a Passenger"
								: "Earn with SafeGo as a Driver"}
						</h2>
						<p>
							{role === "user"
								? "Book safe, verified rides instantly. Your comfort and safety — always our priority."
								: "Set your own schedule. Drive when you want, earn what you deserve with SafeGo."}
						</p>
						<div className="auth-perks">
							{role === "user" ? (
								<>
									<div className="perk-item">
										<div className="perk-icon">🎁</div>
										<div>
											<h4>Free Registration</h4>
											<p>Sign up at zero cost</p>
										</div>
									</div>
									<div className="perk-item">
										<div className="perk-icon">🛡️</div>
										<div>
											<h4>100% Verified Drivers</h4>
											<p>Every driver is background checked</p>
										</div>
									</div>
									<div className="perk-item">
										<div className="perk-icon">💳</div>
										<div>
											<h4>Flexible Payments</h4>
											<p>Cash, UPI, card — your choice</p>
										</div>
									</div>
								</>
							) : (
								<>
									<div className="perk-item">
										<div className="perk-icon">💰</div>
										<div>
											<h4>Competitive Earnings</h4>
											<p>Up to ₹40,000/month potential</p>
										</div>
									</div>
									<div className="perk-item">
										<div className="perk-icon">🕐</div>
										<div>
											<h4>Flexible Hours</h4>
											<p>Drive whenever you want</p>
										</div>
									</div>
									<div className="perk-item">
										<div className="perk-icon">📲</div>
										<div>
											<h4>Easy App</h4>
											<p>Simple driver app, clear navigation</p>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>

				<div className="auth-right signup-right">
					<div className="auth-card signup-card">
						<div className="auth-card-header">
							<h3>Create Account</h3>
							<p>
								Join thousands of SafeGo{" "}
								{role === "user" ? "passengers" : "drivers"}
							</p>
						</div>

						<div className="role-toggle">
							<button
								type="button"
								className={`role-btn ${role === "user" ? "active" : ""}`}
								onClick={() => setRole("user")}
							>
								<i className="fa-solid fa-user role-icon" />
								<span>Passenger</span>
							</button>
							<button
								type="button"
								className={`role-btn ${role === "driver" ? "active" : ""}`}
								onClick={() => setRole("driver")}
							>
								<i className="fa-solid fa-car role-icon" />
								<span>Driver</span>
							</button>
							<div
								className={`role-slider ${role === "driver" ? "right" : ""}`}
							/>
						</div>

						{error && (
							<div className="alert alert-error" style={{ marginBottom: 16 }}>
								<i className="fa-solid fa-circle-exclamation" />
								{error}
							</div>
						)}

						<form className="auth-form" onSubmit={handleSubmit}>
							<div className="form-row">
								<div className="form-group">
									<label>Full Name</label>
									<div className="input-wrapper">
										<i className="fa-solid fa-user input-icon" />
										<input
											type="text"
											name="name"
											placeholder="Your full name"
											value={formData.name}
											onChange={handleChange}
											required
										/>
									</div>
								</div>

								<div className="form-group">
									<label>Phone Number</label>
									<div className="input-wrapper">
										<i className="fa-solid fa-phone input-icon" />
										<input
											type="tel"
											name="phone"
											placeholder="+91 00000 00000"
											value={formData.phone}
											onChange={handleChange}
											required
										/>
									</div>
								</div>
							</div>

							<div className="form-group">
								<label>Email Address</label>
								<div className="input-wrapper">
									<i className="fa-solid fa-envelope input-icon" />
									<input
										type="email"
										name="email"
										placeholder={
											role === "user"
												? "passenger@email.com"
												: "driver@email.com"
										}
										value={formData.email}
										onChange={handleChange}
										required
									/>
								</div>
							</div>

							<div className="form-group full-width">
								<label>Password</label>
								<div className="input-wrapper">
									<i className="fa-solid fa-lock input-icon" />
									<input
										type={showPassword ? "text" : "password"}
										name="password"
										placeholder="Min 8 characters"
										value={formData.password}
										onChange={handleChange}
										required
										minLength={8}
									/>
									<button
										type="button"
										className="eye-btn"
										onClick={() => setShowPassword(!showPassword)}
									>
										<i
											className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
										/>
									</button>
								</div>
							</div>

							<div className="terms-check">
								<input type="checkbox" id="terms" required />
								<label htmlFor="terms">
									I agree to SafeGo's <Link to="/terms">Terms of Service</Link>{" "}
									and <Link to="/privacy">Privacy Policy</Link>
								</label>
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
										Create Account
										<i className="fa-solid fa-arrow-right btn-arrow" />
									</>
								)}
							</button>
						</form>

						<div className="auth-divider">
							<span>or continue with</span>
						</div>
						<button type="button" className="google-btn">
							<img src="https://www.google.com/favicon.ico" alt="Google" />
							Continue with Google
						</button>

						<div className="auth-footer-text">
							<p>
								Already have an account? <Link to="/login">Sign in here</Link>
							</p>
						</div>

						<div className="back-home">
							<Link to="/">← Back to Home</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
