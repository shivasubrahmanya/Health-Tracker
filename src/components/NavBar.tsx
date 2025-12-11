export default function Navbar() {
  return (
    <nav className="navbar">

      <h2 className="nav-logo">Health Tracker</h2>

      <ul className="nav-links">
        <li>Home</li>
        <li>Features</li>
        <li>How it Works</li>
        <li>About</li>
      </ul>

      <div className="nav-buttons">
        <button className="nav-login">Login</button>
        <button className="nav-signup">Sign Up</button>
      </div>

    </nav>
  );
}
