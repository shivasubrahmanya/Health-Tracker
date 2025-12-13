import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  name: String,
  age: String,
  weight: String,
  height: String,
  gender: String,
  goal: String,
  activity: String
});

export default mongoose.model("Profile", profileSchema);
