import express from "express";
import Profile from "../models/profile.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// middleware to verify jwt
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// SAVE or UPDATE profile
router.post("/setup", auth, async (req, res) => {
  const userId = req.userId;

  let existing = await Profile.findOne({ userId });

  if (existing) {
    const updated = await Profile.findOneAndUpdate(
      { userId },
      req.body,
      { new: true }
    );
    return res.json(updated);
  }

  const newProfile = await Profile.create({ userId, ...req.body });
  res.json(newProfile);
});

// GET logged in user profile
router.get("/me", auth, async (req, res) => {
  const userId = req.userId;

  const profile = await Profile.findOne({ userId });

  if (!profile) return res.status(404).json({ message: "No profile" });

  res.json(profile);
});

export default router;
