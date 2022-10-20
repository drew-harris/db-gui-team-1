import prisma from "../utils/prisma.util";

type Review = {
    content: string,
    movieId: number,
    userId: string
}

export async function createReview(body: Record<string, string>) {
    return prisma.review.create({
      data: {
        content: body.content,
        movieId: +body.movieId || null,
        userId: body.userId || null,
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

export async function getReviewById(id: string) {
  return await prisma.review.findUnique({
    where: {
      id,
    },
  });
}
