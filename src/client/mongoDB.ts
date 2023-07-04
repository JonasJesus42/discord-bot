import mongoose from 'mongoose';

const mongoURI =
  'mongodb+srv://root:0aJqjr5pDCCBrVVZ@cluster0.mci07wx.mongodb.net/?retryWrites=true&w=majority';

export async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoURI);
    return true;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return false;
  }
}
