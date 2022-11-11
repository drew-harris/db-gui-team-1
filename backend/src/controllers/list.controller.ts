import { Response } from "express";
import prisma from "../utils/prisma.util";
import { createList } from "../services/list.service";

export async function createListHandler(req, res: Response) {
  try {
    const list = await createList(req.body, req.user);
    return res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not create new list",
      },
    });
  }
}

export async function getListHandler(req, res: Response) {
  try {
    const lists = await prisma.list.findMany({
      where: {
        id: req.query.id,
        name: req.query.name,
        movies: req.query.movies,
        userId: req.query.userId,
      },
    });
    return res.json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not fetch lists from database",
      },
    });
  }
}

export async function deleteListHandler(req, res: Response) {
  try {
    const lists = await prisma.list.delete({
      where: {
        id: req.query.id,
      },
    });
    return res.json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not find list to delete",
      },
    });
  }
}
