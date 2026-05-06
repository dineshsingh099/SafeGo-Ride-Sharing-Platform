import { useAuth } from "../../../context/AuthContext";
import "../../Dashboard/DashboardLayout.css";
import "./Profile.css";

export default function DriverProfile() {
  const { user } = useAuth();

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
    : "—";

  return (
    <>
      <div className="dash-page-title">
        <h1>Driver Profile</h1>
        <p>Your account information and details.</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card dash-section">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large" style={{ background: "var(--success)" }}>
              {user?.name?.[0]?.toUpperCase() || "D"}
            </div>
            <div>
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
              <span className="badge badge-success">Driver</span>
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
              <span className="detail-value" style={{ textTransform: "capitalize" }}>{user?.role || "—"}</span>
            </div>
          </div>
          <div style={{ marginTop: 20, padding: "12px 16px", background: "var(--bg-secondary)", borderRadius: 10, fontSize: 13, color: "var(--text-secondary)" }}>
            <i className="fa-solid fa-circle-info" style={{ marginRight: 6 }} />
            To update your profile details, please contact support.
          </div>
        </div>
      </div>
    </>
  );
}
