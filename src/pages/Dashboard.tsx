import { useEffect, useState } from "react";
import StatRing from "../components/StatRing";
import SummaryBarChart from "../components/SummaryBarChart";
import WeeklyLineChart from "../components/WeeklyLineChart";
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

interface HistoryEntry {
  date: string;
  steps: number;
}

const moodMapReverse: Record<number, { emoji: string; status: string }> = {
  3: { emoji: "😊", status: "Happy" },
  2: { emoji: "😐", status: "Neutral" },
  1: { emoji: "😔", status: "Sad" }
};

const Dashboard = () => {
  const [dailyData, setDailyData] = useState<DailyInputData | null>(null);
  const [weeklyHistory, setWeeklyHistory] = useState<HistoryEntry[]>([]);
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

        const historyRes = await fetch(
          "http://localhost:5000/api/v1/daily-input/history",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (historyRes.ok) {
          setWeeklyHistory(await historyRes.json());
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

  const barData = [
    { name: "Steps", value: displayData.steps },
    { name: "Water", value: displayData.water },
    { name: "Sleep", value: displayData.sleep },
    { name: "Stress", value: displayData.stress }
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeklyChartData =
    weeklyHistory.length > 0
      ? weeklyHistory.map((h) => ({
          day: days[new Date(h.date).getDay()],
          steps: h.steps || 0
        }))
      : [
          { day: "Mon", steps: 3000 },
          { day: "Tue", steps: 4500 },
          { day: "Wed", steps: 6000 },
          { day: "Thu", steps: 8000 },
          { day: "Fri", steps: 7500 },
          { day: "Sat", steps: 9000 },
          { day: "Sun", steps: 11000 }
        ];

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

      <div className="charts-grid">
        <SummaryBarChart data={barData} />
        <WeeklyLineChart data={weeklyChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
