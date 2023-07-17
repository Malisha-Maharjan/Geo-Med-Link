import express from "express";
import { login } from "./routes/login_routes/login";
import {
  activateDonor,
  deactivateDonor,
} from "./routes/user_routes/blood-donor";
import { registerDoctor } from "./routes/user_routes/doctor";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "./routes/user_routes/user";

const app = express();

export const routes =
  (app.use(getAllUser),
  app.use(createUser),
  app.use(getUser),
  app.use(deleteUser),
  app.use(updateUser),
  app.use(deactivateDonor),
  app.use(activateDonor),
  app.use(login),
  app.use(registerDoctor));
