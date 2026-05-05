import React from "react";
import "./Home.css";
import heroImg from "../../assets/hero.png";
import aboutImg from "../../assets/about.png";

import {
	FaShieldAlt,
	FaUserCheck,
	FaCar,
	FaClock,
	FaMapMarkerAlt,
	FaCreditCard,
	FaBell,
	FaChartLine,
	FaCheckCircle,
	FaPhoneAlt,
	FaEnvelope,
	FaHeadset,
} from "react-icons/fa";
import { MdSupportAgent, MdTrackChanges } from "react-icons/md";
import { IoPlay } from "react-icons/io5";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Home = () => {
	return (
		<>
			<Navbar />

			<section id="home" className="hero">
				<div className="hero-left">
					<div className="tag">Safe Rides, Every Time</div>
					<h1>
						Your Ride,
						<br />
						Your Way,
						<br />
						<span>Our Priority</span>
					</h1>
					<p>
						SafeGo is your trusted ride sharing platform. We offer multiple
						services to make your journey safe, comfortable and affordable.
					</p>
					<div className="features">
						<div className="feature">
							<FaShieldAlt className="icon" />
							<span>Safe & Secure</span>
						</div>
						<div className="feature">
							<FaUserCheck className="icon" />
							<span>Verified Drivers</span>
						</div>
						<div className="feature">
							<MdSupportAgent className="icon" />
							<span>24/7 Support</span>
						</div>
					</div>
					<div className="buttons">
						<button className="primary">Get Started</button>
						<button className="secondary">
							<IoPlay /> Watch Video
						</button>
					</div>
				</div>
				<div className="hero-visual">
					<div className="hero-image-wrapper">
						<img src={heroImg} alt="hero" className="hero-image" />
					</div>
				</div>
			</section>

			<section id="about" className="about">
				<div className="about-left">
					<img src={aboutImg} alt="about" />
				</div>
				<div className="about-right">
					<div className="about-tag">
						About Safe<span>Go</span>
					</div>
					<h2>
						Your Trusted Partner in <span>Ride Sharing</span>
					</h2>
					<p>
						SafeGo is a modern ride sharing and delivery platform designed to
						provide safe, reliable, and affordable transportation solutions. We
						connect riders with verified drivers to ensure a smooth journey.
					</p>
					<div className="about-features">
						<div className="about-card">
							<FaShieldAlt className="about-icon" />
							<h4>Safety First</h4>
							<p>Verified drivers and secure rides every time.</p>
						</div>
						<div className="about-card">
							<FaCar className="about-icon" />
							<h4>Multiple Services</h4>
							<p>Bike, auto, car and parcel delivery options.</p>
						</div>
						<div className="about-card">
							<FaClock className="about-icon" />
							<h4>24/7 Availability</h4>
							<p>Book rides anytime, anywhere with ease.</p>
						</div>
					</div>
				</div>
			</section>

			<section id="services" className="services">
				<div className="services-header">
					<p className="subtitle">OUR SERVICES</p>
					<h2>Powerful Features for a Better Journey</h2>
				</div>
				<div className="services-grid">
					<div className="card">
						<FaMapMarkerAlt className="icon" />
						<h3>Ride Matching</h3>
						<p>
							Find the perfect ride instantly with our smart matching system.
						</p>
					</div>
					<div className="card">
						<MdTrackChanges className="icon" />
						<h3>Real-Time Tracking</h3>
						<p>
							Track your ride in real-time with live location and route updates.
						</p>
					</div>
					<div className="card">
						<FaCreditCard className="icon" />
						<h3>Secure Payments</h3>
						<p>Multiple secure payment options for a hassle-free experience.</p>
					</div>
					<div className="card">
						<FaUserCheck className="icon" />
						<h3>Verified Drivers</h3>
						<p>
							All drivers are verified and background checked for your safety.
						</p>
					</div>
					<div className="card">
						<FaBell className="icon" />
						<h3>SOS Emergency</h3>
						<p>
							One-tap emergency alert to your contacts and our support team.
						</p>
					</div>
					<div className="card">
						<FaChartLine className="icon" />
						<h3>Admin Dashboard</h3>
						<p>Powerful dashboard for managing rides, users, and analytics.</p>
					</div>
					<div className="card">
						<FaClock className="icon" />
						<h3>Instant Booking</h3>
						<p>Book rides quickly with minimal steps and fast confirmations.</p>
					</div>
					<div className="card">
						<FaCar className="icon" />
						<h3>Multiple Ride Options</h3>
						<p>Choose from bike, auto, car and premium ride services.</p>
					</div>
				</div>
			</section>

			<section id="how" className="how">
				<div className="how-header">
					<p className="tag">HOW IT WORKS</p>
					<h2>Simple Steps, Smarter Rides</h2>
					<p className="desc">
						Book your ride in just a few taps and enjoy a safe, comfortable and
						reliable journey.
					</p>
				</div>
				<div className="how-steps">
					<div className="step">
						<div className="step-number">01</div>
						<div className="step-icon">
							<FaMapMarkerAlt />
						</div>
						<h3>Choose Location</h3>
						<p>Enter your pickup and drop location.</p>
					</div>
					<div className="step">
						<div className="step-number">02</div>
						<div className="step-icon">
							<FaCar />
						</div>
						<h3>Select Service</h3>
						<p>Choose your preferred ride service.</p>
					</div>
					<div className="step">
						<div className="step-number">03</div>
						<div className="step-icon">
							<FaCheckCircle />
						</div>
						<h3>Confirm Ride</h3>
						<p>Confirm booking and get driver details.</p>
					</div>
					<div className="step">
						<div className="step-number">04</div>
						<div className="step-icon">
							<FaShieldAlt />
						</div>
						<h3>Enjoy the Ride</h3>
						<p>Track your ride in real-time and reach safely.</p>
					</div>
				</div>
			</section>

			<section id="contact" className="contact">
				<div className="contact-container">
					<div className="left">
						<p className="tag">CONTACT US</p>
						<h1>
							We're Here to <span>Help You!</span>
						</h1>
						<p className="desc">
							Have questions or need support? Reach out to us anytime — we're
							here for you 24/7.
						</p>
						<div className="info-card">
							<FaPhoneAlt />
							<div>
								<h4>Call Us</h4>
								<p>+91 XXXXX XXXXX</p>
							</div>
						</div>
						<div className="info-card">
							<FaEnvelope />
							<div>
								<h4>Email Us</h4>
								<p>support@safego.in</p>
							</div>
						</div>
						<div className="info-card">
							<FaMapMarkerAlt />
							<div>
								<h4>Our Location</h4>
								<p>Coming Soon</p>
							</div>
						</div>
						<div className="info-card">
							<FaHeadset />
							<div>
								<h4>24/7 Support</h4>
								<p>We're here anytime, anywhere.</p>
							</div>
						</div>
					</div>
					<div className="right">
						<h3>Send Us a Message</h3>
						<form className="form">
							<div className="row">
								<input type="text" placeholder="Your Name" />
								<input type="email" placeholder="Email Address" />
							</div>
							<input type="text" placeholder="Subject" />
							<textarea placeholder="Your Message"></textarea>
							<button type="submit">Send Message</button>
						</form>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
};

export default Home;
