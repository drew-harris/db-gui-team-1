import prisma from "../utils/prisma.util";
import bcrypt from "bcrypt";
import { omit } from "lodash";

export async function createUser(body) {
  const emailExists = await findUserByEmail(body.email);
  const usernameExists = await findUserByUsername(body.username);

  if (usernameExists.length > 0) {
    throw new Error("Username already exists");
  }

  if (emailExists.length > 0) {
    throw new Error("Email already exists");
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

export async function validateUser(password, actualPass) {
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
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return omit(user, "password");
}
export async function findUserByEmail(email) {
  return await prisma.user.findMany({
    where: {
      email,
    },
  });
}

export async function findUserByUsername(username) {
  return await prisma.user.findMany({
    where: {
      username,
    },
  });
}
