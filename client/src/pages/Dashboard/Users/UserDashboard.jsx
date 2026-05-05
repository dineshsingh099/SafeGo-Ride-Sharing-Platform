import { useAuth } from "../../../context/AuthContext";
import "../DashboardLayout.css";

const stats = [
  { icon: "fa-car-side", color: "blue", value: "12", label: "Total Rides", change: "+3 this week", up: true },
  { icon: "fa-indian-rupee-sign", color: "green", value: "₹2,480", label: "Total Spent", change: "+₹340 this month", up: false },
  { icon: "fa-star", color: "yellow", value: "4.8", label: "Avg Rating", change: "0.2 improvement", up: true },
  { icon: "fa-clock", color: "red", value: "1", label: "Active Rides", change: "Right now", up: true },
];

const recentRides = [
  { from: "Jaipur Railway Station", to: "Pink City Mall", date: "Today, 10:30 AM", fare: "₹120", status: "Completed" },
  { from: "Sindhi Camp", to: "Vaishali Nagar", date: "Yesterday, 6:15 PM", fare: "₹95", status: "Completed" },
  { from: "MI Road", to: "Mansarovar", date: "May 2, 3:00 PM", fare: "₹155", status: "Completed" },
];

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <>
      <div className="dash-page-title">
        <h1>Welcome back, {user?.name?.split(" ")[0] || "Passenger"} 👋</h1>
        <p>Here's your ride summary and recent activity.</p>
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
          <h3>Recent Rides</h3>
          <button className="btn btn-outline" style={{ padding: "7px 14px", fontSize: 12 }}>View All</button>
        </div>
        <div className="ride-list">
          {recentRides.map((r, i) => (
            <div key={i} className="ride-item">
              <div className="ride-route">
                <div className="ride-dot from" />
                <div className="ride-places">
                  <span className="ride-from">{r.from}</span>
                  <span className="ride-arrow"><i className="fa-solid fa-arrow-down" /></span>
                  <span className="ride-to">{r.to}</span>
                </div>
              </div>
              <div className="ride-meta">
                <span className="ride-date">{r.date}</span>
                <span className="ride-fare">{r.fare}</span>
                <span className="badge badge-success">{r.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
