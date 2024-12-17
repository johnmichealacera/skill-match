import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Parse the request body
    const { workerId, feedback } = await req.json();

    // Push the new feedback into the feedback array
    await User.updateOne(
      { _id: new ObjectId(workerId) },
      { $push: { feedback } }
    );

    // Retrieve the updated user document to get the new feedback array
    const updatedUser = await User.findOne({ _id: new ObjectId(workerId) }, { feedback: 1 });

    // Return the updated feedback array
    return NextResponse.json(updatedUser?.feedback || []);
  } catch (error) {
    console.error("Error updating feedback:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
