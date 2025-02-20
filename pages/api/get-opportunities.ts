import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const opportunities = await prisma.opportunity.findMany({
      select: {
        id: true,
        title: true,
        endDatetime: true,
        businessId: true,
        business: {
          select: {
            name: true,
            image: true,
            location: true,
          },
        },
      },
    });

    const formattedOpportunities = opportunities.map((opportunity) => ({
      id: opportunity.id,
      title: opportunity.title,
      endDatetime: opportunity.endDatetime,
      businessName: opportunity.business?.name,
      avatarUrl: opportunity.business?.image,
      location: opportunity.business?.location,
    }));

    res.status(200).json(formattedOpportunities);
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    res.status(500).json({ error: "Failed to fetch opportunities" });
  }
}
