import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { workerType } = await req.json();
    const users = await User.find({ skillSets: { $in: [workerType] } });
    return NextResponse.json({users});
  } catch (error) {
    console.error(error);
  }
}
