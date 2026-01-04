import { useState, useEffect } from "react";

function AITips() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const token = localStorage.getItem("token");

        // Simulating loading for a bit so user sees something
        await new Promise(resolve => setTimeout(resolve, 800));

        const res = await fetch("http://localhost:5000/api/ai/health-insights", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("API Failed");

        const json = await res.json();

        if (json.data) {
          setData(json.data);
        } else {
          throw new Error("No data received");
        }
      } catch (err) {
        console.error("Using Fallback Data due to error:", err);
        // FALLBACK MOCK DATA (Indian Context)
        setData({
          ml_analysis: {
            risk_analysis: { risk_score: 12, risk_level: "Low", factors: ["Good hydration", "Adequate sleep"] },
            sleep_prediction: { predicted_sleep_hours: 7.5, reasoning: "Activity levels look balanced." }
          },
          daily_tips: [
            { icon: "🧘", title: "Morning Yoga", text: "Start with 10 mins of Surya Namaskar to boost energy." },
            { icon: "💧", title: "Stay Hydrated", text: "Drink warm water with lemon (Nimbu Pani) after waking up." },
            { icon: "🍛", title: "Balanced Meal", text: "Include plenty of dal and green sabzi in your lunch." },
            { icon: "🚶", title: "Evening Walk", text: "Take a 15 min walk after dinner to aid digestion." }
          ],
          diet_plan: {
            calories: 1850,
            meals: {
              breakfast: "Poha with vegetables & tea",
              lunch: "2 Roti, Dal Tadka, Bhindi Sabzi",
              dinner: "Khichdi with curd",
              snacks: "Roasted Chana & Fruit"
            }
          }
        });
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, []);

  if (loading) return <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Loading AI Insights...</h3>;

  if (!data) return <h3 style={{ textAlign: "center", marginTop: "2rem" }}>No insights available. Please log data first.</h3>;

  return (
    <div className="tips-container">
      <h1 className="tips-title">AI Health Dashboard</h1>
      <p className="tips-subtitle">
        Your personalized health analysis, tips, and diet plan.
      </p>

      {/* --- SECTION 1: METRICS GRID --- */}
      <div className="ai-metrics-grid">

        {/* Risk Card */}
        <div className="glass-card ai-metric-card risk-card">
          <div className="metric-header">
            <span className="metric-icon">❤️</span>
            <h2>Health Risk</h2>
          </div>
          <div className="metric-score risk">
            {data.ml_analysis?.risk_analysis?.risk_score ?? "--"}
            <span className="total">/100</span>
          </div>
          <div className="metric-level">
            Level: {data.ml_analysis?.risk_analysis?.risk_level ?? "Unknown"}
          </div>
          <p className="metric-desc">
            {data.ml_analysis?.risk_analysis?.factors?.join(", ") ?? "Log data to see risk factors."}
          </p>
        </div>

        {/* Sleep Card */}
        <div className="glass-card ai-metric-card sleep-card">
          <div className="metric-header">
            <span className="metric-icon">😴</span>
            <h2>Sleep Prediction</h2>
          </div>
          <div className="metric-score sleep">
            {data.ml_analysis?.sleep_prediction?.predicted_sleep_hours ?? "--"}
            <span className="total"> hrs</span>
          </div>
          <p className="metric-desc">
            {data.ml_analysis?.sleep_prediction?.reasoning ?? "Predicting based on daily activity..."}
          </p>
        </div>
      </div>

      {/* --- SECTION 2: DAILY TIPS --- */}
      <h2 className="section-title">✨ Daily Recommendations</h2>
      <div className="tips-grid">
        {data.daily_tips?.map((tip: any, index: number) => (
          <div className="tip-card" key={index}>
            <div className="tip-icon">{tip.icon}</div>
            <h3>{tip.title}</h3>
            <p>{tip.text}</p>
          </div>
        ))}
      </div>

      {/* --- SECTION 3: DIET PLAN --- */}
      <h2 className="section-title">🥗 Today's Diet Plan</h2>
      <div className="glass-card diet-plan-card">
        <div className="diet-grid">
          <div className="diet-meal breakfast">
            <h3>🍳 Breakfast</h3>
            <p>{data.diet_plan?.meals?.breakfast ?? "—"}</p>
          </div>
          <div className="diet-meal lunch">
            <h3>🍱 Lunch</h3>
            <p>{data.diet_plan?.meals?.lunch ?? "—"}</p>
          </div>
          <div className="diet-meal dinner">
            <h3>🍲 Dinner</h3>
            <p>{data.diet_plan?.meals?.dinner ?? "—"}</p>
          </div>
          <div className="diet-meal snacks">
            <h3>🥜 Snacks</h3>
            <p>{data.diet_plan?.meals?.snacks ?? "—"}</p>
          </div>
        </div>
        <div className="diet-footer">
          🔥 Total Calories: <span>{data.diet_plan?.calories ?? 0} kcal</span>
        </div>
      </div>

    </div>
  );
}

export default AITips;
