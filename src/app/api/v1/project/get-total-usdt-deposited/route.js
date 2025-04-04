import { connectDB } from "@/server/db"
import Transaction from "@/server/models/transaction";
import { NextResponse } from "next/server";

export const GET=async(req)=>{
try {
    await connectDB();
    const totalStats = await Transaction.aggregate([
        {
          $group: {
            _id: "$address", // Group by unique userId
            totalDeposited: { $sum: "$amount" } // Sum each user's deposits
          }
        },
        {
          $group: {
            _id: null, // Final grouping for total stats
            totalParticipants: { $sum: 1 }, // Count unique users
            totalUSDT: { $sum: "$totalDeposited" } // Total USDT deposited
          }
        }
      ]);
      
      console.log(totalStats,'total stats');
      
  
      const total = totalStats.length > 0 ? totalStats[0]?.totalUSDT : 0;

      let percentage = ( total / 160000000) * 100;
      let participants= totalStats[0]?.totalParticipants ? totalStats[0]?.totalParticipants :0
      return NextResponse.json({ amount: total, percentage: percentage , participants });

} catch (error) {
    console.log(error);
    return NextResponse.json(
        { error: "Failed to fetch total usdt deposit" },
        { status: 500 }
      );

}
}