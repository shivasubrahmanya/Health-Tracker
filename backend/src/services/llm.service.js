import axios from "axios";


export const getHealthInsightsFromLLM = async (prompt) => {
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

  return response.data.choices[0].message.content;
};

const SYSTEM_PROMPT = `
You are a health assistant AI.
Rules:
- No medical diagnosis
- No extreme advice
- Short, actionable tips
- Indian-friendly diet
- Output ONLY valid JSON
`;
