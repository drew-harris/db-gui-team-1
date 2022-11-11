import { Response } from "express";
import prisma from "../utils/prisma.util";
import {
    createList
} from "../services/list.services";


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