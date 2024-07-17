import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    res.status(200).json(session);
  } catch (error) {
    console.error('Failed to fetch session:', error);
    res.status(500).json({ message: 'Failed to fetch session' });
  }
}
