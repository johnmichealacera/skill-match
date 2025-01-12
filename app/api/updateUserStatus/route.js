import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req) {
  try {
    await connectMongoDB();
    const { userId, status } = await req.json();
    const user = await User.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { status } }
    );

    if (user.modifiedCount > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "Update failed" });
    }
  } catch (error) {
    console.error(error);
  }
}
