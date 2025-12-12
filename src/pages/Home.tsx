import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import "../App.css";

export default function Home() {
  return (
    <div className="home">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section" id="home">
        <div className="hero-left">
          <h1 className="hero-title">
            Your Personal AI <br /> Health Coach
          </h1>

          <p className="hero-desc">
            Track your meals, sleep, mood, stress, hydration & more — 
            get AI-powered insights to improve your health.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary">Get Started</Link>
            <Link to="/login" className="btn-secondary">Login</Link>
          </div>
        </div>

        <div className="hero-right">
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

          <img
            className="illustration"
            src="https://cdn-icons-png.flaticon.com/512/4202/4202831.png"
            alt="illustration"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/4228/4228734.png" />
          <h3>AI Insights</h3>
          <p>Discover patterns in your sleep, meals, and mood.</p>
        </div>

        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" />
          <h3>Health Logging</h3>
          <p>Track meals, hydration, stress, and more.</p>
        </div>

        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" />
          <h3>Smart Recommendations</h3>
          <p>Improve your energy, mood, and fitness.</p>
        </div>

        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png" />
          <h3>Weekly Reports</h3>
          <p>Beautiful visual summaries of your health progress.</p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section" id="about">
        <h2 className="why-title">Why Choose Health Tracker?</h2>

        <div className="why-grid">

          <div className="why-box">
            <img className="why-icon" src="https://cdn-icons-png.flaticon.com/512/2886/2886662.png" />
            <h3>AI Powered Coaching</h3>
            <p>Insights that adjust to your health patterns.</p>
          </div>

          <div className="why-box">
            <img className="why-icon" src="https://cdn-icons-png.flaticon.com/512/2913/2913465.png" />
            <h3>Track Everything</h3>
            <p>Meals, mood, hydration, sleep, stress & more.</p>
          </div>

          <div className="why-box">
            <img className="why-icon" src="https://cdn-icons-png.flaticon.com/512/4228/4228734.png" />
            <h3>Smart Recommendations</h3>
            <p>AI suggestions to boost your daily performance.</p>
          </div>

          <div className="why-box">
            <img className="why-icon" src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" />
            <h3>Weekly Health Reports</h3>
            <p>Visual progress reports & improvement insights.</p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <h2 className="how-title">How It Works</h2>

        <div className="how-grid">
          <div className="step-box">
            <span className="step-number">1</span>
            <h3>Create Your Profile</h3>
            <p>Tell us about your lifestyle and goals.</p>
          </div>

          <div className="step-box">
            <span className="step-number">2</span>
            <h3>Track Daily Data</h3>
            <p>Log meals, sleep, mood, stress & activity.</p>
          </div>

          <div className="step-box">
            <span className="step-number">3</span>
            <h3>Get AI Insights</h3>
            <p>Improve your health with smarter decisions.</p>
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
