import DailyInput from "../models/dailyinput.model.js";

/**
 * SAVE / UPDATE DAILY INPUT (ONLY ONCE PER DAY)
 */
export const saveDailyInput = async (req, res) => {
  try {
    const userId = req.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await DailyInput.findOne({ userId, date: today });

    if (existing) {
      const updated = await DailyInput.findOneAndUpdate(
        { userId, date: today },
        req.body,
        { new: true }
      );
      return res.status(200).json(updated);
    }

    const created = await DailyInput.create({
      userId,
      ...req.body,
      date: today
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET TODAY'S INPUT (OPTIONAL)
 */
export const getTodayInput = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const input = await DailyInput.findOne({
      userId: req.user.id,
      date: today
    });

    res.status(200).json(input);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET LATEST INPUT (USED BY DASHBOARD)
 */
export const getLatestInput = async (req, res) => {
  try {
    const latestInput = await DailyInput.findOne({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json(latestInput);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
