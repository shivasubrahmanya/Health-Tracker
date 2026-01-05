import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app.js";
import connectDB from "./config/database.js";


connectDB();


// Only listen if NOT running in Vercel (Vercel sets VERCEL environment variable) or if explicitly testing locally
if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}

export default app;
