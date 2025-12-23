import axios from "axios";

const SYSTEM_PROMPT = `
You are a health assistant AI.

STRICT RULES:
- Output ONLY valid JSON
- No text before or after JSON
- No markdown
- No explanations

JSON FORMAT:
{
  "daily_tips": [],
  "diet_plan": {
    "day": "",
    "meals": {
      "breakfast": "",
      "lunch": "",
      "dinner": "",
      "snacks": ""
    },
    "calories": number
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
        temperature: 0.3
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
    // ✅ HANDLE OPENAI RATE LIMIT
    if (err.response?.status === 429) {
      console.error("⚠️ OpenAI rate limit hit, using fallback");

      return {
        daily_tips: [
          "Try to maintain regular sleep hours",
          "Drink water consistently throughout the day",
          "Light walking can improve mood",
          "Balanced meals improve energy levels"
        ],
        diet_plan: {
          day: "Today",
          meals: {
            breakfast: "Oats + Fruit",
            lunch: "Rice + Dal + Veg",
            dinner: "Chapati + Sabzi",
            snacks: "Fruits / Nuts"
          },
          calories: 1800
        }
      };
    }

    // ❌ Any other error → throw
    throw err;
  }
};
