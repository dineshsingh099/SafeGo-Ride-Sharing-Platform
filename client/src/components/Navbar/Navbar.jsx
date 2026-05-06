import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");
	const [scrolled, setScrolled] = useState(false);

	const toggleMenu = () => setMenuOpen((prev) => !prev);
	const closeMenu = () => setMenuOpen(false);

	const scrollToSection = (sectionId) => {
		closeMenu();
		const el = document.getElementById(sectionId);
		if (el) {
			const navHeight = document.querySelector(".navbar")?.offsetHeight || 70;
			const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
			window.scrollTo({ top, behavior: "smooth" });
		}
	};

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) closeMenu();
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
			const sections = ["home", "about", "services", "how", "contact"];
			const navHeight = document.querySelector(".navbar")?.offsetHeight || 70;
			for (let i = sections.length - 1; i >= 0; i--) {
				const el = document.getElementById(sections[i]);
				if (el && el.getBoundingClientRect().top <= navHeight + 60) {
					setActiveSection(sections[i]);
					break;
				}
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ label: "Home", id: "home" },
		{ label: "About Us", id: "about" },
		{ label: "Services", id: "services" },
		{ label: "How It Works", id: "how" },
		{ label: "Contact Us", id: "contact" },
	];

	return (
		<div className="nav-wrapper">
			<nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
				<div className="logo" onClick={() => scrollToSection("home")}>
					<img src={Logo} alt="SafeGo Logo" className="logo-img" />
					<div className="logo-text">
						<h2>
							Safe<span>Go</span>
						</h2>
						<p>Ride Sharing</p>
					</div>
				</div>

				<ul className="nav-links">
					{navItems.map(({ label, id }) => (
						<li
							key={id}
							className={activeSection === id ? "active" : ""}
							onClick={() => scrollToSection(id)}
						>
							{label}
						</li>
					))}
				</ul>

				<div className="nav-buttons">
					<Link to="/login" className="login-btn">
						Login
					</Link>
					<Link to="/signup" className="signup-btn">
						Sign Up
					</Link>
				</div>

				<button
					className={`hamburger ${menuOpen ? "active" : ""}`}
					onClick={toggleMenu}
					aria-label="Toggle Menu"
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</nav>

			<div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
				<div className="mobile-header">
					<span className="mobile-logo">
						Safe<span>Go</span>
					</span>
					<button className="mobile-close-btn" onClick={closeMenu}>
						✕
					</button>
				</div>

				<ul className="mobile-nav-links">
					{navItems.map(({ label, id }) => (
						<li key={id}>
							<button
								className={activeSection === id ? "active" : ""}
								onClick={() => scrollToSection(id)}
							>
								<span className="dot"></span>
								{label}
							</button>
						</li>
					))}
				</ul>

				<div className="mobile-auth">
					<div className="mobile-auth-label">Account</div>
					<Link to="/login" className="mobile-login-btn" onClick={closeMenu}>
						Login
					</Link>
					<Link to="/signup" className="mobile-signup-btn" onClick={closeMenu}>
						Sign Up →
					</Link>
				</div>
			</div>

			{menuOpen && <div className="overlay" onClick={closeMenu}></div>}
		</div>
	);
};

export default Navbar;
