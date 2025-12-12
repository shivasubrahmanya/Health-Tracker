import { Link } from "react-router-dom";

export default function Navbar() {

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">

      <h2 className="nav-logo">Health Tracker</h2>

      <ul className="nav-links">
        <li onClick={() => scrollToSection("home")}>Home</li>
        <li onClick={() => scrollToSection("features")}>Features</li>
        <li onClick={() => scrollToSection("about")}>About</li>
        <li onClick={() => scrollToSection("how")}>How it Works</li>
        
      </ul>

      <div className="nav-buttons">
        <Link to="/login" className="nav-login">Login</Link>
        <Link to="/signup" className="nav-signup">Sign Up</Link>
      </div>

    </nav>
  );
}
