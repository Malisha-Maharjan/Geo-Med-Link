import express from "express";
import "express-async-errors";
// import http from "http";
import { AppDataSource } from "./data-source";

import { StatusCodes } from "http-status-codes";
import { errorMiddleware } from "./middleware/error";
import { routes } from "./routes";
import { createResponse } from "./utils/response";
const app = express();

// const hostname = "192.168.101.184";

async function main() {
  AppDataSource.initialize()
    .then(async () => {
      console.log("Database connected.");
    })
    .catch((error) => console.log(error));

  app.use(express.json());
  app.use((req, res, next) => {
    console.log(req.url);
    next();
  });
  app.post("/", async (req, res) => {
    return createResponse(res, StatusCodes.BAD_GATEWAY, {
      status: "error",
      error: { message: ["error error"] },
    });
  });
  app.use(routes);

  // app.use(token);

  app.use(errorMiddleware);

  // const server = http.createServer(app);
  // const port = 3000;
  // server.listen(port, hostname, () => {
  //   console.log(`Server running at http://${hostname}:${port}`);
  // });

  app.listen(8080, () => {
    console.log("Now running on port 8080");
  });
}

main();
