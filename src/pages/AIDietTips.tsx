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

    </div>
  );
};

export default AIDietTips;
