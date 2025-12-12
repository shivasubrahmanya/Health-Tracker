import { Router } from "express";
import { setupProfile } from "../controllers/profile.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/setup", auth, setupProfile);

export default router;
