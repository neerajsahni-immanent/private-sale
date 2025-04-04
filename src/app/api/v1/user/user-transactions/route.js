import { connectDB } from "@/server/db";
import Transaction from "@/server/models/transaction";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  try {
    const { amount, address, currency, txHash } = await req.json();

    if (!amount || !address || !currency ) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if transaction already exists
    const existingTx = await Transaction.findOne({ txHash });
    if (existingTx) {
      return Response.json({ error: "Transaction already exists" }, { status: 409 });
    }

    const newTransaction = new Transaction({ amount:amount, address:address, currency:currency, txHash:txHash });
    await newTransaction.save();

    return Response.json({ message: "Transaction saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving transaction:", error);
    return Response.json({ error: "Failed to save transaction" }, { status: 500 });
  }
}
