import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import StatCard from "../components/StatCard";
import MoodMealsCard from "../components/MoodMealsCard";
import "../App.css";

interface DailyInputData {
  steps: number;
  water: number;
  sleep: number;
  stress: number;
  mood: number;
  meals: string;
}

const moodMapReverse: Record<number, { emoji: string; status: string }> = {
  3: { emoji: "😊", status: "Happy" },
  2: { emoji: "😐", status: "Neutral" },
  1: { emoji: "😔", status: "Sad" }
};

const quotes = [
  "Health is not about the weight you lose, but the life you gain.",
  "Take care of your body. It's the only place you have to live.",
  "Happiness is the highest form of health.",
  "Small steps every day lead to big changes over time.",
  "Your health is an investment, not an expense."
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [dailyData, setDailyData] = useState<DailyInputData | null>(null);
  const [goals, setGoals] = useState({ steps: 10000, water: 3, sleep: 8 });
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");

  const defaultData: DailyInputData = {
    steps: 4500,
    water: 2,
    sleep: 7,
    stress: 4,
    mood: 3,
    meals: "Breakfast: Oats\nLunch: Rice & Veggies"
  };

  useEffect(() => {
    // Set a random quote on mount
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const todayRes = await fetch(
          `${API_BASE_URL}/api/v1/daily-input/today`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (todayRes.ok) {
          const data = await todayRes.json();
          if (data) setDailyData(data);
        }

        // Fetch Goals
        const profileRes = await fetch(`${API_BASE_URL}/api/v1/profile/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (profileRes.ok) {
          const profile = await profileRes.json();
          if (profile.goals) setGoals(profile.goals);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <h2 style={{ textAlign: "center", color: "#0f172a" }}>Loading health data...</h2>
      </div>
    );
  }

  const displayData = dailyData || defaultData;
  const moodInfo = moodMapReverse[displayData.mood] || {
    emoji: "😐",
    status: "Neutral"
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // --- HEALTH SCORE CALCULATION ---
  const calculateScore = () => {
    let score = 0;

    // Steps (Max 40 points)
    const stepsScore = Math.min((displayData.steps / goals.steps) * 40, 40);

    // Water (Max 20 points)
    const waterScore = Math.min((displayData.water / goals.water) * 20, 20);

    // Sleep (Max 30 points)
    const sleepScore = Math.min((displayData.sleep / goals.sleep) * 30, 30);

    // Mood (Max 10 points)
    const moodScore = displayData.mood === 3 ? 10 : displayData.mood === 2 ? 5 : 2;

    score = stepsScore + waterScore + sleepScore + moodScore;
    return Math.round(score);
  };

  const healthScore = calculateScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981"; // Green
    if (score >= 50) return "#f59e0b"; // Orange
    return "#ef4444"; // Red
  };

  const scoreColor = getScoreColor(healthScore);

  return (
    <div className="dashboard-container">

      {/* HEADER SECTION */}
      <div className="dashboard-header-row">
        <div>
          <h1 className="dashboard-title">{getGreeting()}, User! 👋</h1>
          <p className="dashboard-subtitle">Here is your daily health snapshot.</p>
        </div>
        <div className="header-badges">
          <div className="streak-badge">🔥 3 Day Streak</div>
          <div className="date-badge">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* TOP SECTION GRID */}
      <div className="dashboard-top-grid">

        {/* HEALTH SCORE CARD */}
        <div className="health-score-card glass-card">
          <div className="score-left">
            <h3>Daily Health Score</h3>
            <p>Based on your activity today</p>
            <div className="score-message" style={{ color: scoreColor }}>
              {healthScore >= 80 ? "🌟 Outstanding Work!" :
                healthScore >= 50 ? "💪 Good Effort, Keep Going!" :
                  "📉 Let's Step It Up!"}
            </div>
          </div>
          <div className="score-right">
            <div className="score-circle" style={{ borderColor: scoreColor }}>
              <span className="score-number" style={{ color: scoreColor }}>{healthScore}</span>
              <span className="score-label">/100</span>
            </div>
          </div>
        </div>

        {/* MOTIVATIONAL QUOTE (Moved Here) */}
        <div className="quote-card glass-card">
          <div className="quote-icon">❝</div>
          <p className="quote-text">{quote}</p>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="section-title">Quick Actions</div>
      <div className="quick-actions-grid">
        <div className="action-card" onClick={() => navigate("/daily-input")}>
          <span className="action-icon">💧</span>
          <span>Log Water</span>
        </div>
        <div className="action-card" onClick={() => navigate("/daily-input")}>
          <span className="action-icon">🥗</span>
          <span>Log Meals</span>
        </div>
        <div className="action-card" onClick={() => navigate("/daily-input")}>
          <span className="action-icon">😴</span>
          <span>Log Sleep</span>
        </div>
        <div className="action-card" onClick={() => navigate("/daily-input")}>
          <span className="action-icon">👟</span>
          <span>Log Steps</span>
        </div>
        <div className="action-card" onClick={() => navigate("/ai-tips")}>
          <span className="action-icon">💡</span>
          <span>Get AI Tips</span>
        </div>
      </div>

      {/* STAT CARDS (LINEAR) */}
      <div className="section-title">Today's Progress</div>
      <div className="ring-grid">
        <StatCard title="Steps" value={displayData.steps} max={goals.steps} unit="steps" color="#10b981" icon="👟" />
        <StatCard title="Water" value={displayData.water} max={goals.water} unit="L" color="#3b82f6" icon="💧" />
        <StatCard title="Sleep" value={displayData.sleep} max={goals.sleep} unit="hrs" color="#a855f7" icon="😴" />
        <MoodMealsCard moodEmoji={moodInfo.emoji} moodStatus={moodInfo.status} meals={displayData.meals} />
      </div>



    </div>
  );
};

export default Dashboard;
