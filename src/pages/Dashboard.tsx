import { useEffect, useState } from "react";
import StatRing from "../components/StatRing";
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

const Dashboard = () => {
  const [dailyData, setDailyData] = useState<DailyInputData | null>(null);
  const [loading, setLoading] = useState(true);

  const defaultData: DailyInputData = {
    steps: 4500,
    water: 2,
    sleep: 7,
    stress: 4,
    mood: 3,
    meals: "Breakfast: Oats\nLunch: Rice & Veggies"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const todayRes = await fetch(
          "http://localhost:5000/api/v1/daily-input/today",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (todayRes.ok) {
          const data = await todayRes.json();
          if (data) setDailyData(data);
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
    return <div className="dashboard-container">Loading health data...</div>;
  }

  const displayData = dailyData || defaultData;
  const moodInfo = moodMapReverse[displayData.mood] || {
    emoji: "😐",
    status: "Neutral"
  };


  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome Back 👋</h1>
      <p className="dashboard-subtitle">Your latest health summary</p>

      <div className="ring-grid">
        <StatRing title="Steps" value={displayData.steps} max={10000} subLabel="/ 10,000" color="#10b981" />
        <StatRing title="Water" value={displayData.water} max={3} unit="L" subLabel="3 liters" color="#3b82f6" />
        <StatRing title="Sleep" value={displayData.sleep} max={9} unit="hrs" subLabel="Goal: 9" color="#a855f7" />
        <MoodMealsCard moodEmoji={moodInfo.emoji} moodStatus={moodInfo.status} meals={displayData.meals} />
      </div>


    </div>
  );
};

export default Dashboard;
