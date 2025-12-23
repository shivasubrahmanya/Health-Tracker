export const getAIInsights = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("AI userId:", userId);

    const inputs = await DailyInput.find({ user: userId })
      .sort({ date: -1 })
      .limit(7);

    console.log("AI inputs count:", inputs.length);

    if (inputs.length < 1) {
      return res.json({
        status: "INSUFFICIENT_DATA",
        message: "Log at least 3 days to unlock AI insights"
      });
    }

    const formattedData = inputs.map(d => ({
      sleep: d.sleepHours,
      water: d.waterIntake,
      steps: d.steps,
      mood: d.mood
    }));

    const prompt = `
User health data (last ${formattedData.length} days):
${JSON.stringify(formattedData, null, 2)}

Generate:
- 4 daily tips
- 1-day diet plan
- Total calories

JSON format:
{
  "daily_tips": [],
  "diet_plan": {
    "day": "",
    "meals": {},
    "calories": number
  }
}
`;

    const llmResponse = await getHealthInsightsFromLLM(prompt);
    const parsed = JSON.parse(llmResponse);

    res.json({
      status: "SUCCESS",
      data: parsed
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI generation failed" });
  }
};
