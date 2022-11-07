import { PrismaClient } from "@prisma/client";
import random from "../utils/mixins";

export default async function users(prisma: PrismaClient) {
  const TOTAL_USERS = 100;
  console.log(`Adding ${TOTAL_USERS} users`);
  const users = random.n(random.user, TOTAL_USERS);

  const createdUser = await prisma.user.createMany({
    data: [...users],
  });
  console.log(`Added ${TOTAL_USERS} users`);
}
