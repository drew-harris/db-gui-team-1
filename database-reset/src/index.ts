import { PrismaClient } from "@prisma/client";
import movies from "./seeds/movies";
import users from "./seeds/users";

async function clearDb(prisma: PrismaClient) {
  try {
    await prisma.review.deleteMany({});
    await prisma.rating.deleteMany({});
    await prisma.movie.deleteMany({});
    await prisma.movieRequest.deleteMany({});
    await prisma.user.deleteMany({});
  } catch (error) {
    console.error(error);
  }
}
function main() {
  const prisma = new PrismaClient();
  clearDb(prisma);
  movies(prisma);
  users(prisma);
}

main();
