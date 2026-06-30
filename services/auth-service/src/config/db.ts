import mongoose from 'mongoose';
import config from './serverConfig';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.mongoUri);
    console.log(`[auth-service] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[auth-service] MongoDB connection error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
