import { connectMongoDB } from "@/lib/mongodb";
import SkillSet from "@/models/skillSet";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const skillSet = await SkillSet.findOne({ name: 'skillSet'});

    return NextResponse.json(skillSet);
  } catch (error) {
    console.error(error);
  }
}
