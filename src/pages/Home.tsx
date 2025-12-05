import Navbar from "../components/NavBar";
import "../App.css";

export default function Home() {
  return (
    <div className="home">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-left">
          <h1 className="hero-title">
            Your Personal AI <br /> Health Coach
          </h1>

          <p className="hero-desc">
            Track your meals, sleep, mood, stress, hydration & more — 
            get AI-powered insights to improve your health.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Login</button>
          </div>
        </div>

        {/* RIGHT SECTION — STATS + IMAGE */}
        <div className="hero-right">

          {/* WELLNESS CARD */}
          <div className="hero-card">
            <h3 className="card-title">Daily Wellness</h3>

            <div className="stat-grid">

              <div className="stat-box score-box">
                <p className="stat-score">82</p>
                <small>Score</small>
              </div>

              <div className="stat-box">
                <p>Sleep</p>
                <div className="bar bar-sleep"></div>
              </div>

              <div className="stat-box">
                <p>Water</p>
                <div className="bar bar-water"></div>
              </div>

              <div className="stat-box">
                <p>Mood</p>
                <span className="emoji">😊</span>
              </div>

            </div>
          </div>

          {/* ILLUSTRATION */}
          <img
            className="illustration"
            src="https://cdn-icons-png.flaticon.com/512/4202/4202831.png"
            alt="illustration"
          />
        </div>
      </section>

<section className="features">

  <div className="feature-card">
    <img src="https://cdn-icons-png.flaticon.com/512/4228/4228734.png" />
    <h3>AI Insights</h3>
    <p>
      Understand your daily habits with advanced AI-powered analytics.  
      Discover patterns in your sleep, meals, and mood to make better choices.
    </p>
  </div>

  <div className="feature-card">
    <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" />
    <h3>Health Logging</h3>
    <p>
      Track everything — meals, hydration, stress, activities, sleep cycles,  
      and more — all in one beautifully organized dashboard.
    </p>
  </div>

  <div className="feature-card">
    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" />
    <h3>Smart Recommendations</h3>
    <p>
      Get personalized suggestions that adapt to your lifestyle.  
      Improve energy, mood, and fitness with science-backed guidance.
    </p>
  </div>

  <div className="feature-card">
    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png" />
    <h3>Weekly Reports</h3>
    <p>
      Receive visual summaries that highlight your progress, patterns,  
      strengths, and areas of improvement — beautifully presented.
    </p>
  </div>

</section>


{/* WHY CHOOSE US */}
<section className="why-section">
  <h2 className="why-title">Why Choose Health Tracker?</h2>

  <div className="why-grid">

    <div className="why-box">
      <img className="why-icon" src="https://cdn-icons-png.flaticon.com/512/2886/2886662.png" />
      <h3>AI Powered Coaching</h3>
      <p>
        Receive personalized wellness insights that adjust to your lifestyle, daily activity, 
        and long-term health patterns.
      </p>
    </div>

    <div className="why-box">
      <img className="why-icon" src="https://cdn-icons-png.flaticon.com/512/2913/2913465.png" />
      <h3>Track Everything</h3>
      <p>
        Meals, mood, hydration, sleep cycles, stress levels—track your entire 
        wellness journey in one simple dashboard.
      </p>
    </div>

    <div className="why-box">
      <img className="why-icon" src="https://cdn-icons-png.flaticon.com/512/4228/4228734.png" />
      <h3>Smart Recommendations</h3>
      <p>
        Health suggestions powered by intelligent algorithms designed to improve 
        your energy, productivity, and mindset.
      </p>
    </div>

    <div className="why-box">
      <img className="why-icon" src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" />
      <h3>Weekly Health Reports</h3>
      <p>
        Beautiful visuals that summarize your progress, highlight trends, 
        and provide clear actionable improvements.
      </p>
    </div>

  </div>
</section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <h2 className="how-title">How It Works</h2>

        <div className="how-grid">

          <div className="step-box">
            <span className="step-number">1</span>
            <h3>Create Your Profile</h3>
            <p>Tell us about your lifestyle, habits, and wellness goals.</p>
          </div>

          <div className="step-box">
            <span className="step-number">2</span>
            <h3>Track Daily Data</h3>
            <p>Log meals, mood, sleep, stress, water intake & activities.</p>
          </div>

          <div className="step-box">
            <span className="step-number">3</span>
            <h3>Get AI Insights</h3>
            <p>Receive personalized suggestions to improve your well-being.</p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Health Tracker — All Rights Reserved</p>
      </footer>
    </div>
  );
}
