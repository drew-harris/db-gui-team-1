import prisma from "../utils/prisma.util";

export async function createReview(body: Record<string, string>) {
  return prisma.review.create({
    data: {
      content: body.content,
      movieId: +body.movieId || null,
      userId: body.userId || null,
    },
  });
}

export async function editReview(id: string, content: string) {
  return prisma.review.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });
}

export function getReviews() {
  return prisma.review.findMany({
    // include: {
    //   for: true,
    //   by: true,
    // },
    // take: 50
  });
}
