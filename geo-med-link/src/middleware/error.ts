import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { createResponse } from "../utils/response";

export const errorMiddleware = (
  e: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!e) {
    console.log("no error");
    next();
    return;
  }

  if (e instanceof ZodError) {
    console.log("this is zod error");
    console.log(e.flatten().fieldErrors);
    return createResponse(res, 400, {
      status: "error",
      error: e.flatten().fieldErrors,
    });
  }

  console.log("not zod error");
  console.log(e);
  return res.status(500).send(e);
};
