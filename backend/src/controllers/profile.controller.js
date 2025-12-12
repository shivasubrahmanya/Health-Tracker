import Profile from "../models/profile.model.js";

export const setupProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    let profile = await Profile.findOne({ userId });

    if (!profile) {
      profile = await Profile.create({ userId, ...req.body });
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }

    res.json({ message: "Profile updated", profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
