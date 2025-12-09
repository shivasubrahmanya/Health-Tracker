function Dashboard() {
  return (
    <div className="dashboard-container">

      <h1 className="title">Welcome Back 👋</h1>
      <p className="subtitle">Here is your health summary for today</p>

      <div className="grid-box">
        
        <div className="card">
          <p className="label">Steps</p>
          <p className="value">4,520</p>
        </div>

        <div className="card">
          <p className="label">Water Intake</p>
          <p className="value">1.8 L</p>
        </div>

        <div className="card">
          <p className="label">Sleep</p>
          <p className="value">6.5 hrs</p>
        </div>

        <div className="card">
          <p className="label">Stress Level</p>
          <p className="value">4 / 10</p>
        </div>

        <div className="card">
          <p className="label">Mood</p>
          <p className="value">😊 Happy</p>
        </div>

        <div className="card">
          <p className="label">Calories</p>
          <p className="value">1,450 kcal</p>
        </div>
      </div>

      <div className="ai-box">
        <div>
          <h2>Your AI Wellness Score</h2>
          <p className="ai-text">You're doing great today! Keep it up 🎉</p>
          <button className="input-btn">+ Add Today’s Input</button>
        </div>

        <div className="score-circle">82</div>
      </div>

    </div>
  );
}

export default Dashboard;
