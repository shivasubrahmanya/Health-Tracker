import DailyInput from "../models/dailyinput.model.js";
import { getHealthInsightsFromLLM } from "../services/llm.service.js";
import axios from "axios";

export const getAIInsights = async (req, res) => {
    try {
        // 🔑 MUST match DailyInput controller
        const userId = req.user.id;

        // 🔒 NORMALIZE TODAY TO MIDNIGHT
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // ✅ FETCH ONLY TODAY'S INPUT
        const input = await DailyInput.findOne({
            userId,
            date: today
        });

        if (!input) {
            return res.json({
                status: "NO_DATA",
                data: {
                    daily_tips: [
                        "Log today's health data to unlock AI tips"
                    ],
                    diet_plan: {
                        day: "—",
                        meals: {
                            breakfast: "—",
                            lunch: "—",
                            dinner: "—",
                            snacks: "—"
                        },
                        calories: 0
                    },
                    ml_analysis: null
                }
            });
        }

        // ✅ SANITIZE TODAY'S DATA ONLY
        const formattedData = {
            water: Math.min(Number(input.water) || 0, 10),     // max 10 L
            sleep: Math.min(Number(input.sleep) || 0, 12),     // max 12 hrs
            steps: Math.min(Number(input.steps) || 0, 30000),  // max 30k
            stress: Math.min(Number(input.stress) || 0, 10),
            mood: Math.min(Number(input.mood) || 0, 5)
        };

        // 🧠 CALL PYTHON ML SERVICE
        let mlInsights = {};
        try {
            const mlUrl = process.env.ML_SERVICE_URL || "http://localhost:8000";

            // Parallel calls for efficiency
            const [riskRes, sleepRes] = await Promise.all([
                axios.post(`${mlUrl}/calc/risk`, formattedData),
                axios.post(`${mlUrl}/predict/sleep`, formattedData)
            ]);

            mlInsights = {
                risk_analysis: riskRes.data,
                sleep_prediction: sleepRes.data
            };
        } catch (mlError) {
            console.error("⚠️ ML Service unavailable:", mlError.message);
            // Fallback object to prevent crash
            mlInsights = {
                error: "ML Service unavailable",
                risk_analysis: { risk_score: "N/A", risk_level: "Unknown" },
                sleep_prediction: { predicted_sleep_hours: "N/A" }
            };
        }

        // ✅ PROMPT USES DATA + ML INSIGHTS
        const prompt = `
User's health data for TODAY:
${JSON.stringify(formattedData, null, 2)}

ML Model Analysis:
${JSON.stringify(mlInsights, null, 2)}

Generate:
- 4 daily health tips for today (Incorporate the ML risk analysis if high)
- 1-day diet plan for today

Return ONLY JSON:
{
  "daily_tips": [],
  "diet_plan": {
    "day": "Today",
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

        const aiData = await getHealthInsightsFromLLM(prompt);

        return res.json({
            status: "SUCCESS",
            data: {
                ...aiData,
                ml_analysis: mlInsights // Pass raw ML data to frontend too
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "AI generation failed" });
    }
};
