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

export function getList() {
    const list = prisma.list.findMany({
        select: {
        id: true,
        name: true,
        createdAt: true,
        movies: true,
        user: true,
        },
    });
    return list;
}

export function deleteList(req, res) {
    try{
        const listDelete = await prisma.list.findFirst({
            where: {
                id: req.body.id,
            },
        });
        
        if(listDelete.userId != req.user.id) {
            res.status(401).json({
                error: {
                    message: "Access denied, you do not own this list",
                },
            });
        }
        await prisma.list.delete({
            where: {
                id: req.body.id,
            },
        });
        return res.json(listDelete);
    } catch (error) {
        res.status(500).json({
            error: {
                message: "Error deleting list",
            },
        });
    }
}



