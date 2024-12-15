import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectMongoDB();
    const { email, imageUrls } = await req.json();
    const result = await User.updateOne({ email },
      { $set: { skillSetsImageByType: imageUrls } });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
  }
};
