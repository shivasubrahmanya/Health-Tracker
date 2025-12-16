import express from "express";
import { saveDailyInput, getTodayInput } from "../controllers/dailyInput.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, saveDailyInput);
router.get("/today", auth, getTodayInput);

export default router;
