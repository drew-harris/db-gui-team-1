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
  const rating = prisma.rating.findMany({
    select: {
      id: true,
      score: true,
      submittedAt: true,
      by: true,
      for: true,
    }
  });
  return rating;
}


export async function getRatingById(id) {
  return await prisma.rating.findMany({
    where: {
      movieId: +id,
    },
  });
}

export async function deleteRatingById(ident) {
  const deleteRating = prisma.rating.delete({
    where: {
      id: ident,
    }
  });
  return deleteRating;
}
