import { connectDB } from "@/server/db";
import Transaction from "@/server/models/transaction";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connectDB();
  try {

  const transactions = await Transaction.find({});
    return NextResponse.json({userDeposits:transactions});
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user deposit" },
      { status: 500 }
    );
  }
}
