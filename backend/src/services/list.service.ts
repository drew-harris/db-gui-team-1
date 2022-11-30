import prisma from "../utils/prisma.util";

export async function createList(body, user) {
  return prisma.list.create({
    data: {
      name: body.name,
      user: { connect: { id: user.id } },
    },
  });
}

export async function createListForNewUser(u) {
  return prisma.list.create({
    data: {
      name: "Watched",
      user: { connect: { id: u } },
    },
  });
}

export async function deleteList(body) {
  const list = prisma.list.delete({
    where: {
      id: body.id,
    },
  });
  return list;
}
