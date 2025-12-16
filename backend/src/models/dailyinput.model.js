import mongoose from "mongoose";

const dailyInputSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  meals: String,
  water: Number,
  sleep: Number,
  steps: Number,
  stress: Number,
  mood: String,

  exercise: String,
  symptoms: String,
  notes: String,

  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0)
  }
});

export default mongoose.model("DailyInput", dailyInputSchema);
