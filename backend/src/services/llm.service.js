import axios from "axios";

const SYSTEM_PROMPT = `
You are an advanced health assistant AI.

YOUR GOAL:
Analyze the user's daily health data (Steps, Sleep, Stress, Water, Mood) and generate:
1. A Health Risk Analysis (Estimate a risk score 0-100 based on medical heuristics).
2. A Sleep Prediction (Estimate next day's sleep hours based on fatigue/stress).
3. 4 Personalized Daily Tips.
4. A 1-Day Diet Plan custom to their needs.

STRICT RULES:
- Output ONLY valid JSON.
- No text before or after JSON.
- No markdown formatting.

JSON OUTPUT STRUCTURE:
{
  "risk_analysis": {
    "risk_score": number, // 0-100 (High score = High Risk)
    "risk_level": "Low" | "Moderate" | "High" | "Critical",
    "factors": ["List 2-3 key factors contributing to this score"]
  },
  "sleep_prediction": {
    "predicted_sleep_hours": number, // e.g., 7.5
    "reasoning": "Brief explanation of why"
  },
  "daily_tips": [
    {
      "title": "Short Title",
      "icon": "Emoji",
      "text": "Detailed tip text"
    }
  ],
  "diet_plan": {
    "day": "Today",
    "meals": {
      "breakfast": "Meal description",
      "lunch": "Meal description",
      "dinner": "Meal description",
      "snacks": "Snack options"
    },
    "calories": number // Total estimated calories
  }
}
`;

export const getHealthInsightsFromLLM = async (prompt) => {
  try {
    const response = await axios.post(
      process.env.LLM_API_URL,
      {
        model: process.env.LLM_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt }
        ],
        temperature: 0.4
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LLM_API_KEY}`
        }
      }
    );

    const raw = response.data.choices[0].message.content;

    // 🔒 SAFE JSON EXTRACTION
    const json = raw.substring(
      raw.indexOf("{"),
      raw.lastIndexOf("}") + 1
    );

    return JSON.parse(json);

  } catch (err) {
    // ✅ HANDLE OPENAI RATE LIMIT or ERROR
    if (err.response?.status === 429) {
      console.error("⚠️ OpenAI rate limit hit, using fallback");
    } else {
      console.error("⚠️ AI Service Error:", err.message);
    }

    // FALLBACK DATA (Prevents app crash)
    return {
      risk_analysis: { risk_score: 50, risk_level: "Moderate", factors: ["Service unavailable"] },
      sleep_prediction: { predicted_sleep_hours: 7, reasoning: "Default estimate" },
      daily_tips: [
        { title: "Hydration", icon: "💧", text: "Stay hydrated to maintain energy." },
        { title: "Stress", icon: "🧘", text: "Take short breaks to reduce stress." },
        { title: "Sleep", icon: "😴", text: "Aim for 8 hours of sleep." },
        { title: "Nutrition", icon: "🍎", text: "Eat a balanced diet with more greens." }
      ],
      diet_plan: {
        day: "Today",
        meals: {
          breakfast: "Oatmeal with berries",
          lunch: "Grilled chicken salad",
          dinner: "Steamed vegetables with rice",
          snacks: "Almonds"
        },
        calories: 2000
      }
    };
  }
};
