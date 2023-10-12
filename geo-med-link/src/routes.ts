import express from "express";
import { forgetPassword } from "./routes/login_routes/forget-password";
import { login } from "./routes/login_routes/login";
import {
  createOrganization,
  deleteOrganization,
  getOrganization,
} from "./routes/organization_routes/organizations";
import {
  LikePost,
  createPost,
  getAllPost,
  getPost,
} from "./routes/post_routes/post";
import { scrapGet, scrapPost } from "./routes/scrap_routes/post";
import {
  activateDonor,
  deactivateDonor,
} from "./routes/user_routes/blood-donor";
import {
  UpdateDoctor,
  registerDoctor,
  verifyDoctor,
} from "./routes/user_routes/doctor";
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
  app.use(registerDoctor),
  app.use(verifyDoctor),
  app.use(UpdateDoctor),
  app.use(createOrganization),
  app.use(deleteOrganization),
  app.use(getOrganization),
  app.use(forgetPassword),
  app.use(scrapPost),
  app.use(scrapGet),
  app.use(createPost),
  app.use(LikePost),
  app.use(getPost),
  app.use(getAllPost));
