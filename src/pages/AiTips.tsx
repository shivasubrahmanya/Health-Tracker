function AITips() {
  const tips = [
    {
      title: "Sleep Better",
      icon: "😴",
      text: "Aim for at least 7 hours of sleep tonight. Avoid screens 1 hour before bedtime."
    },
    {
      title: "Reduce Stress",
      icon: "🧘‍♂️",
      text: "Take a 5-minute breathing break. Inhale for 4 seconds, exhale for 6 seconds."
    },
    {
      title: "Hydration Reminder",
      icon: "💧",
      text: "You drank less water today. Drink 1–2 glasses in the next hour."
    },
    {
      title: "Nutrition Tip",
      icon: "🥗",
      text: "Include protein in your next meal for sustained energy and muscle recovery."
    },
    {
      title: "Mood Support",
      icon: "😊",
      text: "Take a short walk outside. Sunlight exposure helps improve mood."
    }
  ];

  return (
    <div className="tips-container">
      <h1 className="tips-title">AI Daily Tips</h1>
      <p className="tips-subtitle">
        Personalized AI recommendations based on your daily health data.
      </p>

      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div className="tip-card" key={index}>
            <div className="tip-icon">{tip.icon}</div>
            <h3>{tip.title}</h3>
            <p>{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AITips;
