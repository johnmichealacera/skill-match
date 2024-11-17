import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export default async (req, res) => {
  const { newEmail, email, firstName, lastName, phoneNumber, homeAddress, dailyRate } = req.body;

  try {
    await connectMongoDB();

    const result = await User.updateOne({ email },
      { $set: { email: newEmail, firstName, lastName, phoneNumber, homeAddress, dailyRate } });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
