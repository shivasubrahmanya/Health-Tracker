interface Props {
  moodEmoji?: string;
  moodStatus?: string;
  meals?: string;
}

const MoodMealsCard = ({
  moodEmoji = "😊",
  moodStatus = "Happy",
  meals = "No meals logged"
}: Props) => {
  /* --- FOOD ANALYSIS LOGIC --- */
  const analyzeFood = (mealStr: string) => {
    const lower = mealStr.toLowerCase();

    // Keywords (Expanded for Indian Context)
    const healthy = [
      "oats", "salad", "fruit", "veg", "dal", "roti", "chicken", "fish", "egg", "protein", "nuts", "water", "rice", "curd",
      "paneer", "dosa", "idli", "sambar", "rajma", "chawal", "sabzi", "bhindi", "gobi", "palak", "methi", "soup", "sprouts", "millet"
    ];
    const junk = [
      "burger", "pizza", "fried", "sugar", "cola", "soda", "sweet", "cake", "chips", "oil",
      "samosa", "kachori", "pakora", "maggi", "noodles", "bhatura", "ice cream", "chocolate", "biscuits", "namkeen"
    ];

    let healthyCount = 0;
    let junkCount = 0;

    healthy.forEach(w => { if (lower.includes(w)) healthyCount++; });
    junk.forEach(w => { if (lower.includes(w)) junkCount++; });

    if (!mealStr || mealStr === "No meals logged") return { text: "No Data", color: "#94a3b8" };
    if (junkCount > healthyCount) return { text: "⚠️ High Calorie / Junk", color: "#ef4444" };
    if (healthyCount > 0) return { text: "✅ Balanced & Healthy", color: "#10b981" };
    return { text: "⚖️ Moderate Diet", color: "#f59e0b" };
  };

  const verdict = analyzeFood(meals);

  return (
    <div className="glass-card mood-card">

      <div className="mood-section">
        <h4 className="section-header">Today's Mood</h4>
        <div className="mood-content">
          <div className="mood-emoji-animated">{moodEmoji}</div>
          <div className="mood-status">{moodStatus}</div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="meals-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <h4 className="section-header" style={{ margin: 0 }}>Meals Log</h4>
          <span style={{
            fontSize: "0.8rem",
            fontWeight: "700",
            color: verdict.color,
            background: `${verdict.color}20`,
            padding: "4px 8px",
            borderRadius: "8px"
          }}>
            {verdict.text}
          </span>
        </div>

        <div className="meals-chips-container">
          {meals ? (
            meals.split(/,|\n/).map((m, i) => (
              m.trim() && <span key={i} className="meal-chip">{m.trim()}</span>
            ))
          ) : (
            <span className="no-data-text">No meals recorded yet.</span>
          )}
        </div>
      </div>

    </div>
  );
};

export default MoodMealsCard;
