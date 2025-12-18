import express from "express";
import {
  saveDailyInput,
  getTodayInput,
  getLatestInput,
  getWeeklyHistory
} from "../controllers/dailyInput.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, saveDailyInput);
router.get("/today", auth, getTodayInput);
router.get("/latest", auth, getLatestInput);
router.get("/history", auth, getWeeklyHistory);

export default router;
