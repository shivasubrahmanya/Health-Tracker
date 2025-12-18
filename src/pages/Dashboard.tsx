import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- TYPES ---------------- */

interface DailyInput {
  steps?: number;
  water?: number;
  sleep?: number;
  stress?: number;
  mood?: number;
  meals?: string;
  createdAt?: string;
}

/* ---------------- COMPONENT ---------------- */

const Dashboard: React.FC = () => {
  const [dailyData, setDailyData] = useState<DailyInput | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const moodMap: Record<number, string> = {
    1: "😞 Sad",
    2: "😐 Neutral",
    3: "😊 Happy",
    4: "😁 Very Happy"
  };

useEffect(() => {
  const fetchLatestInput = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/daily-input/latest",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();
      setDailyData(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  fetchLatestInput();
}, [token]);


  return (
    <div className="dashboard-container">

      <h1 className="title">Welcome Back 👋</h1>
      <p className="subtitle">
        {dailyData
          ? "Here is your latest health summary"
          : "Add your first daily health input"}
      </p>

      <div className="grid-box">

        <div className="card">
          <p className="label">Steps</p>
          <p className="value">{dailyData?.steps ?? "--"}</p>
        </div>

        <div className="card">
          <p className="label">Water Intake</p>
          <p className="value">
            {dailyData?.water ? `${dailyData.water} L` : "--"}
          </p>
        </div>

        <div className="card">
          <p className="label">Sleep</p>
          <p className="value">
            {dailyData?.sleep ? `${dailyData.sleep} hrs` : "--"}
          </p>
        </div>

        <div className="card">
          <p className="label">Stress Level</p>
          <p className="value">
            {dailyData?.stress ? `${dailyData.stress} / 10` : "--"}
          </p>
        </div>

        <div className="card">
          <p className="label">Mood</p>
          <p className="value">
            {dailyData?.mood ? moodMap[dailyData.mood] : "--"}
          </p>
        </div>

        <div className="card">
          <p className="label">Meals</p>
          <p className="value">
            {dailyData?.meals || "Not logged"}
          </p>
        </div>

      </div>

      <div className="ai-box">
        <div>
          <h2>Your AI Wellness Score</h2>

          <p className="ai-text">
            {dailyData
              ? "You're doing great today! Keep it up 🎉"
              : "Log your daily health to get AI insights"}
          </p>

          <button
            className="input-btn"
            onClick={() => navigate("/daily-input")}
          >
            + Add Today’s Input
          </button>
        </div>

        <div className="score-circle">
          {dailyData ? 82 : "--"}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
