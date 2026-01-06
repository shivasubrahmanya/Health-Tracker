import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app.js";
import connectDB from "./config/database.js";

connectDB();

const PORT = process.env.PORT || 5000;

// On Vercel, the app is exported and run by the platform.
// On Railway or Local (non-Vercel), we start the server manually.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
