import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
console.log(MONGODB_URI);
if (!MONGODB_URI) {
  throw new Error("❌ MongoDB URI is missing in environment variables");
}

let isConnected = false; // Track the connection status

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("🚀 MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Stop the server if DB connection fails
  }
};
