import express from "express";
import {
  saveDailyInput,
  getTodayInput,
  getLatestInput
} from "../controllers/dailyInput.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, saveDailyInput);
router.get("/today", auth, getTodayInput);
router.get("/latest", auth, getLatestInput);

export default router;
