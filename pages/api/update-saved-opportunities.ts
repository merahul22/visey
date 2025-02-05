import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, opportunityId } = req.body;

  if (!userId || !opportunityId) {
    return res.status(400).json({ error: 'Missing userId or opportunityId' });
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        SavedOpportunity: {
          connect: { id: opportunityId },
        },
      },
    });

    return res.status(200).json({ success: 'Opportunity saved successfully' });
  } catch (error) {
    console.error('Failed to update SavedOpportunities:', error);
    return res.status(500).json({ error: 'Failed to update SavedOpportunities' });
  }
}
