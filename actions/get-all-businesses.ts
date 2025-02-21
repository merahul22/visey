import prisma from "@/lib/db";

async function getAllBusinesses() {
  try {
    return await prisma.business.findMany();
  } catch (error) {
    console.log(error);
  }
}

export default getAllBusinesses;
