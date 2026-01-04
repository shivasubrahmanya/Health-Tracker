import { useState } from "react";
import { API_BASE_URL } from "../config";

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

  const moodMap: Record<string, number> = {
    "😊 Happy": 3,
    "😐 Neutral": 2,
    "😔 Sad": 1,
    "😫 Tired": 1,
    "😡 Angry": 1,
    "😰 Anxious": 1
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    const payload = {
      ...form,
      mood: moodMap[form.mood] // ✅ CONVERT HERE
    };

    const res = await fetch(`${API_BASE_URL}/api/v1/daily-input`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

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

      <form className="input-form-grid" onSubmit={handleSubmit}>

        {/* SECTION 1: NUTRITION */}
        <div className="form-section glass-card">
          <div className="section-header-row">
            <span className="section-icon">🥗</span>
            <h3>Nutrition & Hydration</h3>
          </div>

          <div className="input-group">
            <label>Meals</label>
            <textarea
              name="meals"
              value={form.meals}
              onChange={handleChange}
              placeholder="What did you eat today?"
            />
          </div>

          <div className="input-group">
            <label>Water (L)</label>
            <input
              type="number"
              name="water"
              value={form.water}
              onChange={handleChange}
              placeholder="2.0"
              step="0.1"
            />
          </div>
        </div>

        {/* SECTION 2: ACTIVITY & SLEEP */}
        <div className="form-section glass-card">
          <div className="section-header-row">
            <span className="section-icon">🏃</span>
            <h3>Activity & Sleep</h3>
          </div>

          <div className="half-inputs">
            <div className="input-group">
              <label>Steps</label>
              <input
                type="number"
                name="steps"
                value={form.steps}
                onChange={handleChange}
                placeholder="Ex. 5000"
              />
            </div>
            <div className="input-group">
              <label>Sleep (Hrs)</label>
              <input
                type="number"
                name="sleep"
                value={form.sleep}
                onChange={handleChange}
                placeholder="7.5"
                step="0.1"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Exercise Details</label>
            <textarea
              name="exercise"
              value={form.exercise}
              onChange={handleChange}
              placeholder="Running, Gym, Yoga..."
              style={{ height: "80px" }}
            />
          </div>
        </div>

        {/* SECTION 3: WELLBEING */}
        <div className="form-section glass-card">
          <div className="section-header-row">
            <span className="section-icon">🧠</span>
            <h3>Wellbeing</h3>
          </div>

          <div className="half-inputs">
            <div className="input-group">
              <label>Stress (0-10)</label>
              <input
                type="number"
                name="stress"
                value={form.stress}
                onChange={handleChange}
                min="0"
                max="10"
                placeholder="5"
              />
            </div>

            <div className="input-group">
              <label>Mood</label>
              <select name="mood" value={form.mood} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="😊 Happy">😊 Happy</option>
                <option value="😐 Neutral">😐 Neutral</option>
                <option value="😔 Sad">😔 Sad</option>
                <option value="😫 Tired">😫 Tired</option>
                <option value="😡 Angry">😡 Angry</option>
                <option value="😰 Anxious">😰 Anxious</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>Symptoms</label>
            <input
              type="text"
              name="symptoms"
              value={form.symptoms}
              onChange={handleChange}
              placeholder="Headache, fatigue..."
            />
          </div>
        </div>

        {/* SECTION 4: NOTES & SUBMIT */}
        <div className="form-section glass-card">
          <div className="section-header-row">
            <span className="section-icon">📝</span>
            <h3>Daily Notes</h3>
          </div>
          <div className="input-group">
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any other thoughts for today?"
              style={{ height: "100px" }}
            />
          </div>

          <button className="submit-btn" type="submit">
            Save Daily Report
          </button>
        </div>

      </form>
    </div>
  );
}

export default DailyInput;
