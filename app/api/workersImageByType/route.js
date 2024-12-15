import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { id } = await req.json();
    const users = await User.findOne({ _id: new ObjectId(id) });
    return NextResponse.json({users});
  } catch (error) {
    console.error(error);
  }
}
