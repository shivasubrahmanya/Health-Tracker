import { useNavigate } from "react-router-dom";

export default function MainNavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar main-navbar">

      {/* LOGO */}
      <h2 className="nav-logo" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
        Health Tracker
      </h2>

      {/* NAVIGATION LINKS */}
      <ul className="nav-links">
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/daily-input")}>Daily Input</li>
        <li onClick={() => navigate("/ai-tips")}>AI Tips</li>
        <li onClick={() => navigate("/profile")}>Profile</li>
        <li onClick={() => navigate("/settings")}>Settings</li>
      </ul>

      {/* LOGOUT BUTTON */}
      <div className="nav-buttons">
        <button
          className="nav-login"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

    </nav>
  );
}
