import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI as string;

export async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoURI, {
      user: "root",
      pass: "12345678",
      authSource: "admin",
    });
    console.log('Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return false;
  }
}
