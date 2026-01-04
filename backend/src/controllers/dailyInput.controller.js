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
      return res.status(400).json({ message: "You have already logged your data for today!" });
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

/**
 * GET WEEKLY HISTORY (LAST 7 ENTRIES)
 */
export const getWeeklyHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch last 7 entries, sorted by date ascending
    const history = await DailyInput.find({ userId })
      .sort({ date: -1 })
      .limit(7);

    // Reverse to show oldest to newest
    res.status(200).json(history.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL HISTORY (FOR HISTORY PAGE)
 */
export const getAllHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all entries, sorted by date descending (newest first)
    const history = await DailyInput.find({ userId }).sort({ date: -1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * SEED HISTORY (FOR TESTING)
 */
export const seedHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if data already exists
    const existingCount = await DailyInput.countDocuments({ userId });
    if (existingCount > 0) {
      return res.status(400).json({ message: "Data already exists. Clear DB to re-seed." });
    }

    const inputs = [];
    for (let i = 0; i < 10; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);

      inputs.push({
        userId,
        date: d,
        steps: Math.floor(Math.random() * 7000) + 3000, // 3000-10000
        water: parseFloat((Math.random() * 3 + 1).toFixed(1)), // 1-4 L
        sleep: parseFloat((Math.random() * 4 + 4).toFixed(1)), // 4-8 hrs
        stress: Math.floor(Math.random() * 10) + 1, // 1-10
        mood: Math.floor(Math.random() * 3) + 1, // 1-3
        meals: ["Oats", "Salad", "Chicken", "Fruit", "Pasta"][Math.floor(Math.random() * 5)],
        exercise: ["Run", "Yoga", "Gym", "Walk", "None"][Math.floor(Math.random() * 5)],
        notes: "Generated sample data"
      });
    }

    await DailyInput.insertMany(inputs);
    res.status(201).json({ message: "Sample data created!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};