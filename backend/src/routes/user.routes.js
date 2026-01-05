import { Router } from "express";
import { signup, login, exportUserData, deleteUserAccount } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/export", auth, exportUserData);
router.delete("/delete", auth, deleteUserAccount);

export default router;
