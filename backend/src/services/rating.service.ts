import prisma from "../utils/prisma.util";

export async function createRating(body, user) {
  return prisma.rating.create({
    data: {
      score: body.score,
      by: { connect: { id: user.id } },
      for: { connect: { id: parseInt(body.movieId) } },
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
    },
  });
  return rating;
}

export function getRatingById(movieId) {
  return prisma.rating.findMany({
    where: {
      movieId,
    },
  });
}

export async function getAverage(id) {
  const aggregations = prisma.rating.aggregate({
    _avg: {
      score: true,
    },
    where: {
      movieId: +id,
    },
  });

  return (await aggregations)._avg.score;
}

export async function getRatingByUser(userId) {
  return await prisma.rating.aggregate({
    _avg: {
      score: true,
    },
    where: {
      userId,
    },
  });
}

export async function deleteRatingById(ident) {
  const deleteRating = prisma.rating.delete({
    where: {
      id: ident,
    },
  });
  return deleteRating;
}

export async function getAllMoviesRatingsByUser(movID, uID) {
  return await prisma.rating.findMany({
    where: {
      userId: uID,
      movieId: movID,
    },
  });
}

export async function updateMovieScore(ident, newScore) {
  return await prisma.rating.update({
    where: {
      id: ident,
    },
    data: {
      score: +newScore,
    },
  });
}
