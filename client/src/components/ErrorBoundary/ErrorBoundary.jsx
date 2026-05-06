import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", background: "var(--bg)", color: "var(--text)" }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: "48px", color: "#ef4444" }} />
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Something went wrong</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: 400, textAlign: "center" }}>An unexpected error occurred. Please refresh the page or try again later.</p>
          <button onClick={() => window.location.reload()} style={{ padding: "10px 24px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
