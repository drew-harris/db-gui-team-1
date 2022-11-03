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
  return prisma.review.findMany({});
}

export async function getReviewById(id) {
  return await prisma.review.findUnique({
    where: {
      id,
    },
  });
}
export async function getReviewByUserId(userId) {
  return await prisma.review.findMany({
    where: {
      userId,
    },
    select: {
      movieId: true,
      content: true,
    },
    orderBy: {
      submittedAt: "desc",
    },
    take: 10,
  });
}

export async function getReviewByMovieId(movieId: number) {
  return await prisma.review.findMany({
    where: {
      movieId,
    },
  });
}
