import express from "express";
import "express-async-errors";
import { AppDataSource } from "./data-source";

import { errorMiddleware } from "./middleware/error";
import { routes } from "./routes";
const app = express();

// const hostname = "192.168.100.210";

async function main() {
  AppDataSource.initialize()
    .then(async () => {
      console.log("Database connected.");
    })
    .catch((error) => console.log(error));

  app.use(express.json());

  app.get("/", async (req, res) => {
    return res.send("Geo Med Link");
  });

  app.use(routes);

  // app.use(token);

  app.use(errorMiddleware);

  // const server = http.createServer((req: any, res: any) => {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/plain");
  //   res.end("Hello world");
  // });
  // const port = 3000;
  // server.listen(port, hostname, () => {
  //   console.log(`Server running at http://${hostname}:${port}`);
  // });

  app.listen(8080, () => {
    console.log("Now running on port 8080");
  });
}

main();
