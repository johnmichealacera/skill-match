import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { id } = await req.json();
    const user = await User.findById(id).exec();

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
  }
}
