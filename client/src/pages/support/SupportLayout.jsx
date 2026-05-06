import "./Support.css";

export default function SupportLayout({ icon, title, children }) {
  return (
    <div className="support-page">
      <div className="support-hero">
        <div className="support-hero-icon"><i className={`fa-solid ${icon}`} /></div>
        <h1>{title}</h1>
      </div>
      <div className="support-content">{children}</div>
    </div>
  );
}
