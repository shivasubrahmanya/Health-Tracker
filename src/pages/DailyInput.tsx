import { useState } from "react";

function DailyInput() {
  const [form, setForm] = useState({
    meals: "",
    water: "",
    sleep: "",
    steps: "",
    stress: "",
    mood: "",
    exercise: "", // long textarea input
    symptoms: "",
    notes: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You are not logged in");
    return;
  }

  console.log("Submitting to backend:", form);

  const res = await fetch("http://localhost:5000/api/v1/daily-input", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  });

  const data = await res.json();
  console.log("Backend response:", data);

  if (!res.ok) {
    alert(data.message || "Failed to save daily input");
    return;
  }

  alert("Daily input saved successfully!");
};

  return (
    <div className="input-container">
      <h1 className="title">Daily Health Input</h1>
      <p className="subtitle">Enter your health details for today</p>

      <form className="input-form" onSubmit={handleSubmit}>
        
        {/* MEALS */}
        <div className="input-group">
          <label>Meals (Describe what you ate)</label>
          <textarea
            name="meals"
            value={form.meals}
            onChange={handleChange}
            placeholder="Breakfast: Oats... Lunch: Rice + Curry..."
          />
        </div>

        {/* WATER */}
        <div className="input-group">
          <label>Water Intake (Liters)</label>
          <input
            type="number"
            name="water"
            value={form.water}
            onChange={handleChange}
            placeholder="e.g., 2.0"
            step="0.1"
          />
        </div>

        {/* SLEEP */}
        <div className="input-group">
          <label>Sleep Duration (Hours)</label>
          <input
            type="number"
            name="sleep"
            value={form.sleep}
            onChange={handleChange}
            placeholder="e.g., 6.5"
            step="0.1"
          />
        </div>

        {/* STEPS */}
        <div className="input-group">
          <label>Steps Walked</label>
          <input
            type="number"
            name="steps"
            value={form.steps}
            onChange={handleChange}
            placeholder="e.g., 4500"
          />
        </div>

        {/* STRESS */}
        <div className="input-group">
          <label>Stress Level (0 - 10)</label>
          <input
            type="number"
            name="stress"
            value={form.stress}
            onChange={handleChange}
            min="0"
            max="10"
            placeholder="e.g., 4"
          />
        </div>

        {/* MOOD */}
        <div className="input-group">
          <label>Mood</label>
          <select name="mood" value={form.mood} onChange={handleChange}>
            <option value="">Select</option>
            <option value="😊 Happy">😊 Happy</option>
            <option value="😐 Neutral">😐 Neutral</option>
            <option value="😔 Sad">😔 Sad</option>
            <option value="😫 Tired">😫 Tired</option>
            <option value="😡 Angry">😡 Angry</option>
            <option value="😰 Anxious">😰 Anxious</option>
          </select>
        </div>

        {/* EXERCISE */}
        <div className="input-group">
          <label>Exercise You Did</label>
          <textarea
            name="exercise"
            value={form.exercise}
            onChange={handleChange}
            placeholder="e.g., Walking - 30 mins"
          />
        </div>

        {/* SYMPTOMS */}
        <div className="input-group">
          <label>Symptoms (Optional)</label>
          <input
            type="text"
            name="symptoms"
            value={form.symptoms}
            onChange={handleChange}
            placeholder="e.g., Headache, fatigue..."
          />
        </div>

        {/* NOTES */}
        <div className="input-group">
          <label>Additional Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Anything special today?"
          />
        </div>

        <button className="submit-btn" type="submit">
          Submit Today’s Input
        </button>
      </form>
    </div>
  );
}

export default DailyInput;
