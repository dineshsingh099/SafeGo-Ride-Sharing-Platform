import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSidebar } from "../../context/SidebarContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Sidebar.css";

const navConfig = {
  admin: [
    { icon: "fa-gauge-high", label: "Dashboard", to: "/admin/dashboard" },
    { icon: "fa-users", label: "Users", to: "/admin/users" },
    { icon: "fa-car", label: "Drivers", to: "/admin/drivers" },
    { icon: "fa-route", label: "Rides", to: "/admin/rides" },
    { icon: "fa-chart-bar", label: "Analytics", to: "/admin/analytics" },
    { icon: "fa-gear", label: "Settings", to: "/admin/settings" },
  ],
  user: [
    { icon: "fa-gauge-high", label: "Dashboard", to: "/user/dashboard" },
    { icon: "fa-car-side", label: "Book Ride", to: "/user/book" },
    { icon: "fa-clock-rotate-left", label: "Ride History", to: "/user/history" },
    { icon: "fa-user", label: "Profile", to: "/user/profile" },
    { icon: "fa-headset", label: "Support", to: "/user/support" },
  ],
  driver: [
    { icon: "fa-gauge-high", label: "Dashboard", to: "/driver/dashboard" },
    { icon: "fa-location-dot", label: "Go Online", to: "/driver/go-online" },
    { icon: "fa-clock-rotate-left", label: "Trip History", to: "/driver/history" },
    { icon: "fa-wallet", label: "Earnings", to: "/driver/earnings" },
    { icon: "fa-user", label: "Profile", to: "/driver/profile" },
    { icon: "fa-headset", label: "Support", to: "/driver/support" },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { collapsed, mobileOpen, toggleCollapse, closeMobile } = useSidebar();
  const navigate = useNavigate();
  const role = user?.role || "user";
  const items = navConfig[role] || navConfig.user;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={closeMobile} />}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-dot" />
            {!collapsed && <span className="sidebar-logo-text">Safe<strong>Go</strong></span>}
          </div>
          <button className="sidebar-collapse-btn" onClick={toggleCollapse}>
            <i className={`fa-solid ${collapsed ? "fa-chevron-right" : "fa-chevron-left"}`} />
          </button>
        </div>

        {!collapsed && (
          <div className="sidebar-user">
            <div className="sidebar-avatar">{user?.name?.[0]?.toUpperCase() || "U"}</div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{user?.name || "User"}</span>
              <span className={`sidebar-role-badge role-${role}`}>{role}</span>
            </div>
          </div>
        )}

        <nav className="sidebar-nav">
          {items.map(({ icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
              onClick={closeMobile}
              title={collapsed ? label : undefined}
            >
              <i className={`fa-solid ${icon}`} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-top">
            <ThemeToggle />
            {!collapsed && <span className="sidebar-footer-label">Theme</span>}
          </div>
          <button className="sidebar-logout" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
