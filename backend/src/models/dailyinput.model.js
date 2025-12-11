import mongoose from "mongoose";

const dailySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  meals: String,
  water: String,
  sleep: String,
  stress: String,
  mood: String,
  steps: String,
  exercise: String,
  symptoms: String,
  notes: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("DailyInput", dailySchema);
