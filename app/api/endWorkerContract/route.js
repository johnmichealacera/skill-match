import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req) {
  try {
    await connectMongoDB();
    const { workerId, hireBy } = await req.json();
    const result = await User.updateOne({ _id: new ObjectId(workerId) },
      { $set: { hireBy: null } });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
  }
};
