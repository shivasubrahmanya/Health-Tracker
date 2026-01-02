import { useState, useEffect } from "react";

function AITips() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/ai/health-insights", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load AI insights", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Loading AI Insights...</h3>;

  if (!data) return <h3 style={{ textAlign: "center", marginTop: "2rem" }}>No insights available. Please log data first.</h3>;

  return (
    <div className="tips-container">
      <h1 className="tips-title">AI Health Dashboard</h1>
      <p className="tips-subtitle">
        Your personalized health analysis, tips, and diet plan.
      </p>

      {/* --- SECTION 1: RISK & SLEEP --- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>

        {/* Risk Card */}
        <div className="glass-card" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#d32f2f", marginTop: 0 }}>❤️ Health Risk</h2>
          <div style={{ fontSize: "3.5rem", fontWeight: "800", color: "#d32f2f", margin: "10px 0" }}>
            {data.ml_analysis?.risk_analysis?.risk_score ?? "--"}
            <span style={{ fontSize: "1.2rem", fontWeight: "600", color: "#ef5350" }}>/100</span>
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#b71c1c", marginBottom: "1rem" }}>
            Level: {data.ml_analysis?.risk_analysis?.risk_level ?? "Unknown"}
          </div>
          <p style={{ color: "#555" }}>
            {data.ml_analysis?.risk_analysis?.factors?.join(", ") ?? "Log data to see risk factors."}
          </p>
        </div>

        {/* Sleep Card */}
        <div className="glass-card" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#1976d2", marginTop: 0 }}>😴 Sleep Prediction</h2>
          <div style={{ fontSize: "3.5rem", fontWeight: "800", color: "#1976d2", margin: "10px 0" }}>
            {data.ml_analysis?.sleep_prediction?.predicted_sleep_hours ?? "--"}
            <span style={{ fontSize: "1.2rem", color: "#64b5f6" }}> hrs</span>
          </div>
          <p style={{ color: "#555", marginTop: "1rem" }}>
            {data.ml_analysis?.sleep_prediction?.reasoning ?? "Predicting based on daily activity..."}
          </p>
        </div>
      </div>

      {/* --- SECTION 2: DAILY TIPS --- */}
      <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#113c38", fontSize: "28px", fontWeight: "800" }}>✨ Daily Recommendations</h2>
      <div className="tips-grid" style={{ marginBottom: "4rem" }}>
        {data.daily_tips?.map((tip: any, index: number) => (
          <div className="tip-card" key={index}>
            <div className="tip-icon">{tip.icon}</div>
            <h3>{tip.title}</h3>
            <p>{tip.text}</p>
          </div>
        ))}
      </div>

      {/* --- SECTION 3: DIET PLAN --- */}
      <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#113c38", fontSize: "28px", fontWeight: "800" }}>🥗 Today's Diet Plan</h2>
      <div className="glass-card" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div style={{ padding: "10px" }}>
            <h3 style={{ color: "#e65100" }}>🍳 Breakfast</h3>
            <p>{data.diet_plan?.meals?.breakfast ?? "—"}</p>
          </div>
          <div style={{ padding: "10px" }}>
            <h3 style={{ color: "#2e7d32" }}>🍱 Lunch</h3>
            <p>{data.diet_plan?.meals?.lunch ?? "—"}</p>
          </div>
          <div style={{ padding: "10px" }}>
            <h3 style={{ color: "#1565c0" }}>🍲 Dinner</h3>
            <p>{data.diet_plan?.meals?.dinner ?? "—"}</p>
          </div>
          <div style={{ padding: "10px" }}>
            <h3 style={{ color: "#6a1b9a" }}>🥜 Snacks</h3>
            <p>{data.diet_plan?.meals?.snacks ?? "—"}</p>
          </div>
        </div>
        <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", color: "#37474f", borderTop: "1px solid #eee", paddingTop: "1rem" }}>
          🔥 Total Calories: <span style={{ color: "#d84315" }}>{data.diet_plan?.calories ?? 0} kcal</span>
        </div>
      </div>

    </div>
  );
}

export default AITips;
