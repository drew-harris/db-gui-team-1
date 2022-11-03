import bcrypt from "bcrypt";
import { omit } from "lodash";
import prisma from "../utils/prisma.util";

export async function createUser(body: Record<string, string>) {
  const emailExists = await findUserByEmail(body.email);
  const usernameExists = await findUserByUsername(body.username);

  if (emailExists || usernameExists) {
    const error: any = new Error("User already exists");
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
    select: {
      username: true,
      password: false,
      createdAt: true,
      email: true,
      id: true,
    },
  });

  return user;
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

  return users;
}
export async function editBio(id, bio) {
  const users = await prisma.user.update({
   where:{
    id
   },
   data:{
    bio
   }
  });

  return users;
}
export async function editImage(id, profileImageUrl) {
  const user = await prisma.user.update({
   where:{
    id
   },
   data:{
    profileImageUrl
   }
  });

  return user;
}

export async function getUserById(id) {
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
