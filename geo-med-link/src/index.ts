import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { ZodError } from "zod";
import { AppDataSource } from "./data-source";
import {
  createUser,
  deleteUser,
  getAllUser,
  updateUser,
} from "./routes/user_routes/user";
// import { deleteUser } from "./routes/user_routes/delete-user";
// import { getAllUser } from "./routes/user_routes/get-all-user";
import { login } from "./routes/login_routes/login";
import {
  activateDonor,
  deactivateDonor,
  registerDonor,
} from "./routes/user_routes/blood-donor";
import { getUser } from "./routes/user_routes/user";
import { createResponse } from "./utils/response";
// import { updateUser } from "./routes/user_routes/update-user";

const app = express();

async function main() {
  AppDataSource.initialize()
    .then(async () => {
      console.log("Database connected.");
    })
    .catch((error) => console.log(error));

  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.url);
    next();
  });

  app.get("/", async (req, res) => {
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

  // app.use(updateUser);

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
