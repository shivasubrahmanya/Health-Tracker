import express from "express";
import { getAIInsights } from "../controllers/ai.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/health-insights", auth, getAIInsights);

export default router;
