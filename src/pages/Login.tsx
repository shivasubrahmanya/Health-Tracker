import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // Save token for protected routes
    localStorage.setItem("token", data.token);

    alert("Login successful!");

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="glass-bg">
      <div className="glass-card">

        <h2 className="glass-title">Login</h2>

        <div className="glass-group">
          <input
            name="email"
            type="email"
            required
            placeholder="Enter your email address"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="glass-group">
          <input
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button className="glass-btn" onClick={handleLogin}>Login</button>

        <p className="glass-footer">
          Don’t have an account? <a href="/signup">Create one</a>
        </p>

      </div>
    </div>
  );
}

export default Login;
