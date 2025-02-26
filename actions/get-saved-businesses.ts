import prisma from "@/lib/db";

export default async function getSavedBusinesses(userId: string) {
  try {
    const savedBusinesses = await prisma.savedBusiness.findMany({
      where: {
        userId,
      },
      include: {
        business: true,
      },
    });

    return { success: true, data: savedBusinesses };
  } catch (e) {
    return { error: "Something went wrong" };
  }
}
