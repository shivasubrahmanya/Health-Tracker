import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  age: Number,
  weight: Number,
  goal: String
});

export default mongoose.model("Profile", profileSchema);
