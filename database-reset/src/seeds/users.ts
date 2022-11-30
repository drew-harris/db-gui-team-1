import { PrismaClient } from "@prisma/client";
import random from "../utils/mixins";

export default async function users(prisma: PrismaClient) {
  const TOTAL_USERS = 100;
  console.log(`Adding ${TOTAL_USERS} users`);
  let users = random.n(random.user, TOTAL_USERS);

  const createdUser = await prisma.user.createMany({
    data: [...users],
  });
  console.log(`Added ${TOTAL_USERS} users`);

  users = await prisma.user.findMany({});
  users.forEach(async(elem: any) => {
    const createdUser = await prisma.user.update({
      where:{
        id: elem.id
      },
      data: {
        profileImageUrl: 'https://robohash.org/' + random.integer({ min: 100, max: 10000000 }).toString() + '.png'
      }
    });
  })
}
