function SignUp() {
  return (
    <div className="glass-bg">
      <div className="glass-card">

        <h2 className="glass-title">Sign Up</h2>

        {/* Full Name */}
        <div className="glass-group">
          <input
            type="text"
            required
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div className="glass-group">
          <input
            type="email"
            required
            placeholder="Enter your email address"
          />
        </div>

        {/* Password */}
        <div className="glass-group">
          <input
            type="password"
            required
            placeholder="Enter your password"
          />
        </div>

        {/* Button */}
        <button className="glass-btn">Sign Up</button>

        {/* Footer */}
        <p className="glass-footer">
          Already have an account? <a href="#">Login</a>
        </p>

      </div>
    </div>
  );
}

export default SignUp;
