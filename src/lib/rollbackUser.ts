import prisma from "@/lib/database/dbClient";

export const rollbackUser = async (userId: string | null) => {
  if (!userId) return;

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (rollbackError) {
    console.error(
      "Rollback failed. Orphaned auth user:",
      userId,
      rollbackError,
    );
  }
};
