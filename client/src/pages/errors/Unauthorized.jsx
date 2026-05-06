import { Link, useNavigate } from "react-router-dom";
import "./Errors.css";

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <div className="error-icon"><i className="fa-solid fa-lock" /></div>
      <h2>Access Denied</h2>
      <p>You don't have permission to access this page.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn btn-outline" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left" /> Go Back
        </button>
        <Link to="/" className="btn btn-primary">
          <i className="fa-solid fa-house" /> Home
        </Link>
      </div>
    </div>
  );
}
