import { useAuth } from "../../../context/AuthContext";
import "../../Dashboard/DashboardLayout.css";
import "./Profile.css";

export default function AdminProfile() {
  const { user } = useAuth();
  return (
    <>
      <div className="dash-page-title">
        <h1>Admin Profile</h1>
        <p>Your account information.</p>
      </div>
      <div className="dash-section" style={{ maxWidth: 500 }}>
        <div className="profile-avatar-section">
          <div className="profile-avatar-large" style={{ background: "#f59e0b" }}>{user?.name?.[0]?.toUpperCase() || "A"}</div>
          <div>
            <h3>{user?.name || "Super Admin"}</h3>
            <p>{user?.email}</p>
            <span className="badge badge-warning">Admin</span>
          </div>
        </div>
      </div>
    </>
  );
}
