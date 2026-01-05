import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  name: String,
  age: String,
  weight: String,
  height: String,
  gender: String,
  goal: String,
  activity: String,

  // New Fields for Settings
  goals: {
    steps: { type: Number, default: 10000 },
    water: { type: Number, default: 3 }, // Liters
    sleep: { type: Number, default: 8 }  // Hours
  },
  preferences: {
    theme: { type: String, default: "dark" }, // 'light' or 'dark'
    notifications: { type: Boolean, default: true }
  }
});

export default mongoose.model("Profile", profileSchema);
