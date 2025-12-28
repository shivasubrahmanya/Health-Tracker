import { useEffect, useState } from "react";

const AIDietTips = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/ai/health-insights", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("AI RESPONSE:", json);
        setData(json.data);
      })
      .catch(() => {
        setData({
          daily_tips: ["Failed to load AI data"],
          diet_plan: {
            day: "—",
            meals: {
              breakfast: "—",
              lunch: "—",
              dinner: "—",
              snacks: "—",
            },
            calories: 0,
          },
        });
      });
  }, []);

  if (!data) {
    return <h3>Loading AI insights...</h3>;
  }

  // --- ML HELPER FUNCTIONS ---
  const ml = data.ml_analysis || {};
  const riskScore = ml.risk_analysis?.risk_score || 0;
  const riskLevel = ml.risk_analysis?.risk_level || "Unknown";
  const predictedSleep = ml.sleep_prediction?.predicted_sleep_hours || "—";

  const getRiskColor = (score: number) => {
    if (score < 30) return "#4caf50"; // Green
    if (score < 60) return "#ff9800"; // Orange
    return "#f44336"; // Red
  };
  const riskColor = getRiskColor(riskScore);

  return (
    <div className="diet-tips-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

      {/* LEFT CARD */}
      <div className="card tips-card">
        <h2>Daily AI Tips</h2>
        <ul>
          {data.daily_tips.map((tip: string, i: number) => (
            <li key={i}>💡 {tip}</li>
          ))}
        </ul>
      </div>

      {/* RIGHT CARD */}
      <div className="card diet-card">
        <h2>AI Diet Plan</h2>

        <p><b>Day:</b> {data.diet_plan.day}</p>
        <p><b>Breakfast:</b> {data.diet_plan.meals.breakfast}</p>
        <p><b>Lunch:</b> {data.diet_plan.meals.lunch}</p>
        <p><b>Dinner:</b> {data.diet_plan.meals.dinner}</p>
        <p><b>Snacks:</b> {data.diet_plan.meals.snacks}</p>

        <p>🔥 {data.diet_plan.calories} kcal</p>
      </div>

      {/* ML ANALYSIS CARD */}
      {ml.risk_analysis && (
        <div className="card ml-card glass-panel" style={{ gridColumn: '1 / -1', padding: '20px' }}>
          <h2 className="ml-card-header">
            🤖 AI Health Analysis
          </h2>

          <div className="ml-grid">

            {/* RISK SCORE SECTION */}
            <div className="risk-section">
              <h3>Health Risk Score</h3>
              <div
                className="risk-circle-container"
                style={{
                  border: `4px solid ${riskColor}`,
                  boxShadow: `0 0 20px ${riskColor}40`
                }}
              >
                <div>
                  <span className="risk-score-value">{riskScore}</span>
                  <div className="risk-score-max">/ 100</div>
                </div>
              </div>
              <p className="risk-label" style={{ color: riskColor }}>
                {riskLevel.toUpperCase()} RISK
              </p>
            </div>

            {/* SLEEP PREDICTION SECTION */}
            <div className="sleep-section">
              <h3>Tonight's Forecast</h3>
              <div className="prediction-box">
                <div className="prediction-label">Predicted Sleep</div>
                <div className="prediction-value">
                  {predictedSleep} hrs
                </div>
                <div className="prediction-sub">
                  based on activity
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AIDietTips;
