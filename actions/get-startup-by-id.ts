import prisma from "@/lib/db";

export async function getStartupById(id: string) {
  try {
    const startup = await prisma.startup.findFirst({
      where: {
        id,
      },
    });

    if (!startup) {
      return { error: "Startup not found" };
    }

    return { success: "Startup found", startup };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
}
