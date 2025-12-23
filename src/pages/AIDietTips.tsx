import { useEffect, useState } from "react";

const AIDietTips = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/ai/health-insights", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("AI RESPONSE:", json);
        setData(json);
      })
      .catch((err) => {
        console.error(err);
        setError("API FAILED");
      });
  }, []);

  /* 🔥 NO EARLY RETURNS ANYMORE */
  return (
    <div style={{ padding: "20px", color: "black" }}>
      <h1>AI Tips Page</h1>

      {error && <p>{error}</p>}

      {!data && <p>Loading...</p>}

      {data && data.status === "INSUFFICIENT_DATA" && (
        <h3>{data.message}</h3>
      )}

      {data && data.status === "SUCCESS" && (
        <>
          {/* DAILY TIPS */}
          <div className="card">
            <h2>Daily AI Tips</h2>
            <ul>
              {data.data.daily_tips.map((tip: string, i: number) => (
                <li key={i}>💡 {tip}</li>
              ))}
            </ul>
          </div>

          {/* DIET PLAN */}
          <div className="card">
            <h2>AI Diet Plan</h2>
            <p><b>Day:</b> {data.data.diet_plan.day}</p>
            <p><b>Breakfast:</b> {data.data.diet_plan.meals.breakfast}</p>
            <p><b>Lunch:</b> {data.data.diet_plan.meals.lunch}</p>
            <p><b>Dinner:</b> {data.data.diet_plan.meals.dinner}</p>
            <p><b>Snacks:</b> {data.data.diet_plan.meals.snacks}</p>
            <p>🔥 {data.data.diet_plan.calories} kcal</p>
          </div>
        </>
      )}
    </div>
  );
};

export default AIDietTips;
