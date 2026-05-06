import { Link } from "react-router-dom";
import "./Errors.css";

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-code">404</div>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">
        <i className="fa-solid fa-house" /> Back to Home
      </Link>
    </div>
  );
}
