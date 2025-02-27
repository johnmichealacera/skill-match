import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Cart from "@/models/cart";
import Wishlist from "@/models/wishlist";
// import Payment from "@/models/Payment";
// import Order from "@/models/order";

export async function POST(req) {
  try {
    const { firstName, lastName, email, phoneNumber, homeAddress, birthDate, yearsExperience, dailyRate, password, role } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    const userData = {
      firstName,
      lastName,
      homeAddress,
      birthDate,
      yearsExperience,
      dailyRate,
      password: hashedPassword,
      role,
    };
    if (email?.trim()) {
      userData.email = email.trim();
    }
    if (phoneNumber?.trim()) {
      userData.phoneNumber = phoneNumber.trim();
    }
    const newUser = await User.create(userData);
    // Create a cart collection with the user's _id
    await Cart.create({
      user: newUser._id,
    });
    await Wishlist.create({
      user: newUser._id,
    });
    // await Payment.create({
    //   user: newUser._id,
    // });
    // Create an order collection with the user's _id

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while registering the user.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
