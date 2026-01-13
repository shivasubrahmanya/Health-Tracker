import app from "../src/app.js";
import connectDB from "../src/config/database.js";

// Ensure database connects before handling request
connectDB();

export default app;
