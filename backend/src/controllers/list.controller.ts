import { Response } from "express";
import { createList, deleteList } from "../services/list.service";
import prisma from "../utils/prisma.util";

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
        movies: req.query.movieId
          ? {
              some: { id: req.query.movieId },
            }
          : undefined,
        userId: req.query.userId,
      },
      include: {
        _count: {
          select: {
            movies: true,
          },
        },
        movies: true,
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

export async function getMoviesInList(req, res: Response) {
  try {
    const ident = req.params.id;
    const lists = await prisma.list.findMany({
      where: {
        id: ident,
      },
      select: {
        id: true,
        name: true,
        movies: true,
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
    const list = await deleteList(req.body);
    return res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not delete list",
      },
    });
  }
}

export async function addToMovieListHandler(req, res: Response) {
  try {
    const lists = await prisma.list.update({
      where: {
        id: req.query.id,
      },
      data: {
        movies: {
          connect: {
            id: req.query.movieId,
          },
        },
      },
    });
    return res.json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not add to movie list",
      },
    });
  }
}

export async function removeFromMovieListHandler(req, res: Response) {
  try {
    const lists = await prisma.list.update({
      where: {
        id: req.query.id,
      },
      data: {
        movies: {
          disconnect: {
            id: req.query.movieId,
          },
        },
      },
    });
    return res.json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not find movie to remove",
      },
    });
  }
}

export async function addMovieFromRating(mov, usr) {
  try {
    const watchedList = await prisma.list.findFirst({
      where: {
        userId: usr,
        name: "Watched",
      },
    });
    const lists = await prisma.list.update({
      where: {
        id: watchedList.id,
      },
      data: {
        movies: {
          connect: {
            id: mov,
          },
        },
      },
    });
    return lists;
  } catch (error) {
    console.error(error);
    throw new Error(
      error?.message || "Failed to add rated movie to watched list"
    );
  }
}
