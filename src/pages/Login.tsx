function Login(){
  return (
    <div className="glass-bg">
      <div className="glass-card">

        <h2 className="glass-title">Login</h2>

        <div className="glass-group">
          <input
            type="email"
            required
            placeholder="Enter your email address"
          />
        </div>

        <div className="glass-group">
          <input
            type="password"
            required
            placeholder="Enter your password"
          />
        </div>

        <button className="glass-btn">Login</button>

        <p className="glass-footer">
          Don’t have an account? <a href="#">Create one</a>
        </p>

      </div>
    </div>
  );
};

export default Login;
