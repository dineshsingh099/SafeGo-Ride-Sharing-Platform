import "./SkeletonLoader.css";

export default function SkeletonLoader({ type = "card", count = 1 }) {
  if (type === "page") {
    return (
      <div className="sk-page">
        <div className="sk-sidebar">
          {[...Array(6)].map((_, i) => <div key={i} className="sk-sidebar-item sk-pulse" />)}
        </div>
        <div className="sk-main">
          <div className="sk-header sk-pulse" />
          <div className="sk-grid">
            {[...Array(4)].map((_, i) => <div key={i} className="sk-stat-card sk-pulse" />)}
          </div>
          <div className="sk-content sk-pulse" />
        </div>
      </div>
    );
  }

  if (type === "card") {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="sk-card">
            <div className="sk-card-header sk-pulse" />
            <div className="sk-card-line sk-pulse" />
            <div className="sk-card-line short sk-pulse" />
          </div>
        ))}
      </>
    );
  }

  if (type === "list") {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="sk-list-item">
            <div className="sk-avatar sk-pulse" />
            <div className="sk-list-text">
              <div className="sk-line sk-pulse" />
              <div className="sk-line short sk-pulse" />
            </div>
          </div>
        ))}
      </>
    );
  }

  return <div className="sk-block sk-pulse" />;
}
