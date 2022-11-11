import { PrismaClient } from "@prisma/client";
import { movies, reviews } from "./seeds/movies";
import users from "./seeds/users";

async function clearDb(prisma: PrismaClient) {
  await prisma.review.deleteMany({});
  await prisma.rating.deleteMany({});
  await prisma.movie.deleteMany({});
  await prisma.movieRequest.deleteMany({});
  await prisma.user.deleteMany({});
}
async function main() {
  try {
    const prisma = new PrismaClient();
    console.log("Clearing db");
    await clearDb(prisma);
    console.log("Db cleared");
    await movies(prisma);
    await users(prisma);
    await reviews(prisma);
  } catch (error) {
    console.error(error);
  }
}
main();
