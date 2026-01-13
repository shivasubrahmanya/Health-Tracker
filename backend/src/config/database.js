import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        const connectioInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${connectioInstance.connection.host}`);
    } catch (error) {
        console.error('Connection to MongoDB failed:', error);
        // Do not process.exit(1) in serverless environment as it kills the instance
        throw error;
    }
}
export default connectDB;