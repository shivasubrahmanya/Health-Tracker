import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import dailyInputRoutes from "./routes/dailyInput.routes.js";


const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/daily-input", dailyInputRoutes);
export default app;
