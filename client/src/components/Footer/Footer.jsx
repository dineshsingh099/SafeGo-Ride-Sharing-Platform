import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-dot" />
            <span>Safe<strong>Go</strong></span>
          </div>
          <p>Your trusted ride-sharing platform — safe, reliable, and always on time.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter" /></a>
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook" /></a>
            <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin" /></a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4>Company</h4>
          <ul>
            <li><Link to="/#about">About Us</Link></li>
            <li><Link to="/#services">Services</Link></li>
            <li><Link to="/#how">How It Works</Link></li>
            <li><Link to="/#contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Support</h4>
          <ul>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/cancellation-policy">Cancellation Policy</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SafeGo. All rights reserved.</p>
        <p>Made with <i className="fa-solid fa-heart" style={{ color: "#ef4444" }} /> in India</p>
      </div>
    </footer>
  );
}
