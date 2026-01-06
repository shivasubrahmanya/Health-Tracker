import express from "express";
import cors from "cors";
import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import dailyInputRoutes from "./routes/dailyInput.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import userRoutes from "./routes/user.routes.js";


const app = express();

// --- SECURITY MIDDLEWARE ---

// 1. Set Security Headers
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

// Health Check Route (verify server is running)
app.get("/", (req, res) => {
    res.send("API is running...");
});

// 2. Enable CORS
app.use(cors({
    origin: "*", // Allow all origins for now (debugging)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// 3. Body Parser (limit body size to prevent DoS)
app.use(express.json({ limit: "10kb" }));

// 4. Data Sanitization (Temporarily removed due to crash)
// app.use(mongoSanitize());

// --- RATE LIMITERS ---

// Global Limiter: 100 requests per 15 minutes
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again in 15 minutes."
});
app.use("/api", globalLimiter);

// Auth Limiter: 20 login/signup attempts per hour
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    message: "Too many login attempts, please try again after an hour"
});
app.use("/api/v1/auth", authLimiter);

// AI Limiter: 10 requests per hour (prevent high costs)
const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: "AI quota exceeded. Please try again later."
});
app.use("/api/ai", aiLimiter); // Apply specifically to AI routes


// --- ROUTES ---
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/daily-input", dailyInputRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/v1/user", userRoutes);

export default app;
