import axios from "axios";

const SYSTEM_PROMPT = `
You are an advanced health assistant AI customized for an INDIAN USER.

YOUR GOAL:
Analyze the user's daily health data (Steps, Sleep, Stress, Water, Mood) and generate truly values-based insights.

STRICT GUIDELINES:
1. **INDIAN CONTEXT ONLY**:
   - Meals MUST be real Indian dishes (e.g., Poha, Upma, Dosa, Idli, Rajma Chawal, Roti Sabzi, Dal Tadka, Khichdi, Curd Rice).
   - Tips MUST reference Indian lifestyle (e.g., "Do Surya Namaskar", "Drink warm turmeric milk (Haldi Doodh)", "Practice Anulom Vilom").

2. **DYNAMIC CONTENT**:
   - **Do NOT return generic text.** The advice must be specific to their stats.
   - If **Stress is High (8-10)**: Suggest calming techniques like Pranayama or drinking Chamomile/Tulsi tea.
   - If **Sleep is Low (<6h)**: Suggest "Yoga Nidra" or avoiding caffeine (Chai/Coffee) post 6 PM.
   - If **Steps are Low (<3000)**: Suggest "Walk while talking on the phone" or "Take stairs".

3. **DYNAMIC EMOJIS**:
   - **Crucial**: Select a UNIQUE, RELEVANT emoji for every single tip and meal.
   - Do NOT use valid generic emojis. Match the text (e.g. 🧘 for Yoga, 🍛 for Dal, 🍵 for Tea, 🏏 for activity).

STRICT JSON FORMATTING RULES:
- **Output COMPLIANT JSON only.**
- **Double-quote ALL keys and string values.**
- **EMOJIS MUST BE QUOTED.** (Correct: "icon": "🧘", Incorrect: "icon": 🧘). 
- Do not add comments // inside the JSON.
- Do not output markdown backticks.

JSON OUTPUT STRUCTURE:
{
  "risk_analysis": {
    "risk_score": 12, 
    "risk_level": "Low",
    "factors": ["Factor 1", "Factor 2"]
  },
  "sleep_prediction": {
    "predicted_sleep_hours": 7.5,
    "reasoning": "Reason here"
  },
  "daily_tips": [
    {
      "title": "Tip Title",
      "icon": "🧘", 
      "text": "Tip text here"
    }
  ],
  "diet_plan": {
    "day": "Today",
    "meals": {
      "breakfast": "Poha 🥘",
      "lunch": "Roti & Sabzi 🍛",
      "dinner": "Dal & Rice 🍲",
      "snacks": "Fruits 🍎"
    },
    "calories": 2000
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
