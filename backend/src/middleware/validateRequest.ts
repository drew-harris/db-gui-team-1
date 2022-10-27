import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects, ZodError, ZodSchema } from "zod";

type FieldOption = "body" | "query";

const validate =
  (schema: ZodSchema, parseField: FieldOption) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log("Middleware for ", parseField);
      // console.log("Request body", req.body);
      schema.parse(parseField === "body" ? req.body : req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: error,
          message: error.issues[0].message,
        });
      }
      return res.status(400).json(error);
    }
  };

export default validate;
