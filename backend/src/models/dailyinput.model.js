import mongoose from "mongoose";

const dailyInputSchema = new mongoose.Schema(
  {
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

    mood: {
      type: Number,
      required: true
    },

    exercise: String,
    symptoms: String,
    notes: String,

    date: {
      type: Date,
      default: () => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("DailyInput", dailyInputSchema);
