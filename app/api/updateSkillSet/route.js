import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectMongoDB();
    const { email, skillSets } = await req.json();
    const user = await User.updateOne(
      { email }, 
      { $set: { skillSets } }
    );
    
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
  }
}
