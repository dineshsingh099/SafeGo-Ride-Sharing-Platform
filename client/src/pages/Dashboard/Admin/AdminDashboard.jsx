import { useAuth } from "../../../context/AuthContext";
import "../DashboardLayout.css";

const stats = [
  { icon: "fa-users", color: "blue", value: "1,284", label: "Total Users", change: "+128 this month", up: true },
  { icon: "fa-car", color: "green", value: "342", label: "Active Drivers", change: "+28 this month", up: true },
  { icon: "fa-route", color: "yellow", value: "8,492", label: "Total Rides", change: "+12% vs last month", up: true },
  { icon: "fa-indian-rupee-sign", color: "red", value: "₹4.2L", label: "Monthly Revenue", change: "+18% growth", up: true },
];

const recentUsers = [
  { name: "Priya Sharma", email: "priya@example.com", role: "user", status: "Active", joined: "Today" },
  { name: "Rahul Verma", email: "rahul@example.com", role: "driver", status: "Pending", joined: "Yesterday" },
  { name: "Anita Singh", email: "anita@example.com", role: "user", status: "Active", joined: "May 3" },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <>
      <div className="dash-page-title">
        <h1>Admin Dashboard</h1>
        <p>Platform overview and management — {user?.name}</p>
      </div>

      <div className="stat-cards">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}><i className={`fa-solid ${s.icon}`} /></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-change ${s.up ? "up" : "down"}`}>
              <i className={`fa-solid ${s.up ? "fa-arrow-trend-up" : "fa-arrow-trend-down"}`} />
              {s.change}
            </div>
          </div>
        ))}
      </div>

      <div className="dash-section">
        <div className="dash-section-header">
          <h3>Recent Registrations</h3>
          <button className="btn btn-outline" style={{ padding: "7px 14px", fontSize: 12 }}>View All</button>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u, i) => (
                <tr key={i}>
                  <td><strong>{u.name}</strong></td>
                  <td style={{ color: "var(--text-secondary)" }}>{u.email}</td>
                  <td><span className={`badge ${u.role === "driver" ? "badge-success" : "badge-primary"}`}>{u.role}</span></td>
                  <td><span className={`badge ${u.status === "Active" ? "badge-success" : "badge-warning"}`}>{u.status}</span></td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 12 }}>{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
