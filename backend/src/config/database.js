import mongoose from 'mongoose';

const connectDB = async () => {
    try{
            const connectioInstance=await mongoose.connect
            (`${process.env.MONGODB_URI}`,)
            console.log(`MongoDB connected: ${connectioInstance.connection.host}`);
    }catch(error){
        console.error('Connection to MongoDB failed:', error);
        process.exit(1);
    }
}
export default connectDB;