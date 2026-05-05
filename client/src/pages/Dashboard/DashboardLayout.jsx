import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSidebar } from "../../context/SidebarContext";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import { useAuth } from "../../context/AuthContext";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  const { collapsed, toggleMobile } = useSidebar();
  const { user } = useAuth();

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className={`dashboard-main ${collapsed ? "collapsed" : ""}`}>
        <header className="dash-topbar">
          <button className="topbar-menu-btn" onClick={toggleMobile} aria-label="Open menu">
            <i className="fa-solid fa-bars" />
          </button>
          <div className="topbar-title" />
          <div className="topbar-right">
            <ThemeToggle />
            <div className="topbar-user">
              <div className="topbar-avatar">{user?.name?.[0]?.toUpperCase() || "U"}</div>
              <span className="topbar-name">{user?.name || "User"}</span>
            </div>
          </div>
        </header>
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
