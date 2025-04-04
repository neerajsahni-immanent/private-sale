import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    amount: { type: String, required: true },
    address: { type: String, required: true },
    currency: { type: String, required: true },
    txHash: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

// Prevent model recompilation
export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
