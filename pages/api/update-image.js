import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { email, imageUrl } = req.body;

  try {
    await connectMongoDB();
    const result = await User.updateOne({ email: email },
      { $set: { imageUrl } });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
