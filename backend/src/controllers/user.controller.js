import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    // Create token for auto-login after signup
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: { id: user._id, name: user.name }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const exportUserData = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    const profile = await import("../models/profile.model.js").then(m => m.default.findOne({ userId }));
    const history = await import("../models/dailyinput.model.js").then(m => m.default.find({ userId }));

    const data = {
      user,
      profile,
      history
    };

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    // Delete related data first
    await import("../models/dailyinput.model.js").then(m => m.default.deleteMany({ userId }));
    await import("../models/profile.model.js").then(m => m.default.findOneAndDelete({ userId }));

    // Delete user
    await User.findByIdAndDelete(userId);

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
