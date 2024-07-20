import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectMongoDB = async () => {
  if (isConnected) {
    return; // If already connected, use the existing connection
  }
  const MONGO_URI = process.env.MONGO_URI;
  try {
    const db = await mongoose.connect(`${MONGO_URI}`);
    isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};
