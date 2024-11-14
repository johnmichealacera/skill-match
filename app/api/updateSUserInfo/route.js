import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectMongoDB();
    const { email, firstName, lastName, phoneNumber, homeAddress } = await req.json();
    const user = await User.updateOne(
      { email },
      { $set: { email, firstName, lastName, phoneNumber, homeAddress} }
    );

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
  }
}
