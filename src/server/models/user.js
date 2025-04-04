import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, unique: true, trim: true, required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Use lowercase for models and prevent re-compilation errors
export default mongoose.models.user || mongoose.model("User", UserSchema);
