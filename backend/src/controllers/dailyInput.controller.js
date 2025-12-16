import DailyInput from "../models/dailyinput.model.js";

// Save or update today's input
export const saveDailyInput = async (req, res) => {
  const userId = req.userId;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await DailyInput.findOne({ userId, date: today });

  if (existing) {
    const updated = await DailyInput.findOneAndUpdate(
      { userId, date: today },
      req.body,
      { new: true }
    );
    return res.json(updated);
  }

  const created = await DailyInput.create({
    userId,
    ...req.body
  });

  res.json(created);
};

// Get today's input
export const getTodayInput = async (req, res) => {
  const userId = req.userId;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const input = await DailyInput.findOne({ userId, date: today });
  res.json(input);
};
