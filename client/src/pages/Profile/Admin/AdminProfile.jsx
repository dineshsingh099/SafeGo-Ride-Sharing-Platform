import { useAuth } from "../../../context/AuthContext";
import "../../Dashboard/DashboardLayout.css";
import "./Profile.css";

export default function AdminProfile() {
  const { user } = useAuth();

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
    : "—";

  return (
    <>
      <div className="dash-page-title">
        <h1>Admin Profile</h1>
        <p>Your admin account information.</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card dash-section">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large" style={{ background: "#f59e0b" }}>
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div>
              <h3>{user?.name || "Super Admin"}</h3>
              <p>{user?.email}</p>
              <span className="badge badge-warning">Admin</span>
            </div>
          </div>
          <div style={{ marginTop: 16, color: "var(--text-secondary)", fontSize: 13 }}>
            <i className="fa-solid fa-calendar-days" style={{ marginRight: 6 }} />
            Joined {joinedDate}
          </div>
        </div>

        <div className="dash-section" style={{ flex: 1 }}>
          <div className="dash-section-header"><h3>Account Details</h3></div>
          <div className="profile-detail-list">
            <div className="profile-detail-item">
              <span className="detail-label"><i className="fa-solid fa-user" /> Full Name</span>
              <span className="detail-value">{user?.name || "—"}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label"><i className="fa-solid fa-envelope" /> Email</span>
              <span className="detail-value">{user?.email || "—"}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label"><i className="fa-solid fa-phone" /> Phone</span>
              <span className="detail-value">{user?.phone || "—"}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label"><i className="fa-solid fa-shield-halved" /> Role</span>
              <span className="detail-value">Administrator</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
