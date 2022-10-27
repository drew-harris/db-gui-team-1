import prisma from "../utils/prisma.util";

export async function createRating(body: Record<string, string>, user) {
  return prisma.rating.create({
    data: {
      score: parseInt(body.score),
      submittedAt: new Date(),
      by: { connect: { id: user.id } },
      for: { connect: { id: parseInt(body.id) } },
    },
  });
}

export function getRatings() {
  return prisma.rating.findMany({
    orderBy: {
      score: "desc",
    },

    take: 50,
  });
}

export async function getRatingById(id: string) {
  return await prisma.rating.findUnique({
    where: {
      id,
    },
  });
}
