import { useAuth } from "../../../context/AuthContext";
import "../DashboardLayout.css";

const stats = [
  { icon: "fa-route", color: "blue", value: "8", label: "Trips Today", change: "+2 vs yesterday", up: true },
  { icon: "fa-indian-rupee-sign", color: "green", value: "₹1,840", label: "Today's Earnings", change: "+₹240 vs avg", up: true },
  { icon: "fa-star", color: "yellow", value: "4.9", label: "Driver Rating", change: "Top 10%", up: true },
  { icon: "fa-clock", color: "red", value: "6h 20m", label: "Online Time", change: "Today", up: true },
];

const trips = [
  { from: "Jhotwara", to: "Civil Lines", time: "11:45 AM", fare: "₹210", status: "Completed" },
  { from: "Vaishali Nagar", to: "Gopalpura", time: "10:10 AM", fare: "₹185", status: "Completed" },
  { from: "Tonk Road", to: "Bajaj Nagar", time: "8:30 AM", fare: "₹145", status: "Completed" },
];

export default function DriverDashboard() {
  const { user } = useAuth();

  return (
    <>
      <div className="dash-page-title">
        <h1>Good morning, {user?.name?.split(" ")[0] || "Driver"} 👋</h1>
        <p>Your earnings and trips for today.</p>
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
          <h3>Today's Trips</h3>
          <button className="btn btn-outline" style={{ padding: "7px 14px", fontSize: 12 }}>View All</button>
        </div>
        <div className="ride-list">
          {trips.map((t, i) => (
            <div key={i} className="ride-item">
              <div className="ride-route">
                <div className="ride-dot from" />
                <div className="ride-places">
                  <span className="ride-from">{t.from}</span>
                  <span className="ride-arrow"><i className="fa-solid fa-arrow-down" /></span>
                  <span className="ride-to">{t.to}</span>
                </div>
              </div>
              <div className="ride-meta">
                <span className="ride-date">{t.time}</span>
                <span className="ride-fare">{t.fare}</span>
                <span className="badge badge-success">{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
