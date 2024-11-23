import prisma from '@/lib/db';

export async function getBusinessById(id: string) {
  try {
    const business = await prisma.business.findFirst({
      where: {
        id
      },
      include: {
        services: true,
        opportunities: true,
        achievements: true,
      }
    })

    if (!business) {
      return { error: "Business not found" }
    }

    return { success: "Business found", business }

  }catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
}