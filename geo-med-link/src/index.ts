import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { ZodError } from "zod";
import { AppDataSource } from "./data-source";
import { login } from "./routes/login_routes/login";
import {
  activateDonor,
  deactivateDonor,
  registerDonor,
} from "./routes/user_routes/blood-donor";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "./routes/user_routes/user";
// import { loadEnv } from "./utils/env";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "./routes/login_routes/jwt";
import { env } from "./utils/env";
import { createResponse } from "./utils/response";
const app = express();

async function main() {
  AppDataSource.initialize()
    .then(async () => {
      console.log("Database connected.");
    })
    .catch((error) => console.log(error));

  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url != "/api/login") {
      const token = req.headers["authorization"];
      if (!token)
        return createResponse(res, StatusCodes.FORBIDDEN, {
          status: "error",
          error: { message: ["Invalid Token"] },
        });
      if (!token?.includes("Bearer"))
        return createResponse(res, 400, {
          status: "error",
          error: { message: ["Token invalid"] },
        });

      if (verifyToken(token.split(" ")[1])) {
        console.log({ token });
        next();
      }
    }
    next();
  });

  app.get("/", async (req, res) => {
    // console.log(createToken());
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTWFsaXNoYSIsImlhdCI6MTY4OTMzMjQzN30.1JmLEvxIu_vs4bIj5UZWWRhXoGhu8PzAZuqah9s4tSI";
    // console.log(verifyToken(token));
    console.log(JSON.stringify(env, null, 2));
    return res.send("Geo Med Link");
  });

  app.use(getAllUser);
  app.use(registerDonor);
  app.use(createUser);
  app.use(getUser);
  app.use(deleteUser);
  app.use(updateUser);
  app.use(deactivateDonor);
  app.use(activateDonor);
  app.use(login);

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
