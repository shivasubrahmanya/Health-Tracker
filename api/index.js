
import app from '../backend/src/app.js';
import connectDB from '../backend/src/config/database.js';

// Connect to Database
connectDB();

// Export the Express app
export default app;
