import { useTheme } from "../../context/ThemeContext";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
      <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`} />
    </button>
  );
}
