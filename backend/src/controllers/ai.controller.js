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

        // 🧠 AI COMPLETE ANALYSIS (Replaces Python ML Service)
        const prompt = `
User's Health Data (Today):
${JSON.stringify(formattedData, null, 2)}

Task:
Analyze this data. 
- If stress is high and sleep is low, risk should be higher.
- If steps are low, suggest movement tips.
- Predict sleep based on activity (more activity usually = better sleep).
`;

        // The LLM now returns all insights including risk & sleep
        const aiData = await getHealthInsightsFromLLM(prompt);

        return res.json({
            status: "SUCCESS",
            data: {
                daily_tips: aiData.daily_tips,
                diet_plan: aiData.diet_plan,
                // ✅ ADAPTER: Map AI risk/sleep output to the "ml_analysis" key expected by frontend
                ml_analysis: {
                    risk_analysis: aiData.risk_analysis,
                    sleep_prediction: aiData.sleep_prediction
                }
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "AI generation failed" });
    }
};
