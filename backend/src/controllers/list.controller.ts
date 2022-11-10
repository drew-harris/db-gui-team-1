import { Request, Response } from "express";
import prisma from "../utils/prisma.util";
export async function createList(body: Record<string, string>) {
    return prisma.list.create({
        data: {
          id: body.id,
          name: body.name,
          createdAt: body.createdAt,
          movies: body.movies,
          user: { connect: { userId: body.id}}, 
        },
    }); 
}



