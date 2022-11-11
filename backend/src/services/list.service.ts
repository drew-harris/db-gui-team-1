import prisma from "../utils/prisma.util";

export async function createList(body, user) {
  return prisma.list.create({
    data: {
      name: body.name,
      user: { connect: { id: user.id } },
    },
  });
}
