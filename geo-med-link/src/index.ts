import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { ZodError } from "zod";
import { AppDataSource } from "./data-source";

import { routes } from "./routes";
import { createResponse } from "./utils/response";
const app = express();

async function main() {
  AppDataSource.initialize()
    .then(async () => {
      console.log("Database connected.");
    })
    .catch((error) => console.log(error));

  app.use(express.json());

  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   if (req.url != "/api/login") {
  //     const token = req.headers["authorization"];
  //     if (!token)
  //       return createResponse(res, StatusCodes.UNAUTHORIZED, {
  //         status: "error",
  //         error: { message: ["Invalid Token"] },
  //       });
  //     if (!token?.startsWith("Bearer "))
  //       return createResponse(res, StatusCodes.UNAUTHORIZED, {
  //         status: "error",
  //         error: { message: ["Token invalid"] },
  //       });

  //     if (verifyToken(token.split(" ")[1])) {
  //       console.log({ token });
  //     }
  //   }
  //   next();
  // });

  app.get("/", async (req, res) => {
    return res.send("Geo Med Link");
  });

  app.use(routes);

  app.use((e: Error, req: Request, res: Response, next: NextFunction) => {
    if (!e) {
      console.log("no error");
      next();
      return;
    }

    if (e instanceof ZodError) {
      console.log("this is zod error");
      return createResponse(res, 400, {
        status: "error",
        error: e.flatten().fieldErrors,
      });
    }

    console.log("not zod error");
    return res.status(500).send(e);
  });
  app.listen(8080, () => {
    console.log("Now running on port 8080");
  });
}

main();
