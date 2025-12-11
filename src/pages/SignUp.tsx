import { useState } from "react";

function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    console.log(data);
    alert(data.message);
  };

  return (
    <div className="glass-bg">
      <div className="glass-card">
        <h2 className="glass-title">Sign Up</h2>

        {/* Full Name */}
        <div className="glass-group">
          <input
            name="name"
            type="text"
            required
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
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

        {/* Password */}
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

        {/* Button */}
        <button className="glass-btn" onClick={handleSignup}>
          Sign Up
        </button>

        <p className="glass-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
