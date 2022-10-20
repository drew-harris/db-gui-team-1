import prisma from "../utils/prisma.util";
import bcrypt from "bcrypt";
import { omit } from "lodash";

export async function createUser(body: Record<string, string>) {
  const emailExists = await findUserByEmail(body.email);
  const usernameExists = await findUserByUsername(body.username);

  if (emailExists || usernameExists) {
    const error = new Error("User already exists");
    // @ts-ignore
    error.code = 409;
    throw error;
  }
  const salt = await bcrypt.genSalt(12);

  const hash = await bcrypt.hash(body.password, salt);

  const user = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      password: hash,
    },
  });

  return omit(user, "password");
}

export async function validateUser(password: string, actualPass: string) {
  return await bcrypt.compare(password, actualPass);
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });

  return omit(users, "password");
}

export async function getUserById(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return omit(user, "password");
}
export async function findUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}

export async function findUserByUsername(username: string) {
  return await prisma.user.findFirst({
    where: {
      username,
    },
  });
}
