import express from "express";
import { spamPost } from "./routes/admin_routes/spam_post";
import { unverifiedDoctor } from "./routes/admin_routes/unverified_doctor";
import {
  deleteComment,
  getComment,
  likeComment,
  postComment,
  updateComment,
} from "./routes/comment_routes/comment";
import { login } from "./routes/login_routes/login";
import { changePassword } from "./routes/password_routes/change-password";
import { forgetPassword } from "./routes/password_routes/forget-password";
import {
  LikePost,
  createPost,
  deletePost,
  getAllPost,
  getPost,
  reportPost,
  userPost,
} from "./routes/post_routes/post";
import { scrapGet, scrapPost } from "./routes/scrap_routes/post";
import { send } from "./routes/scratch/emails";
import {
  getOrganizations,
  getServices,
} from "./routes/services_routes/organization_services";
import {
  activateDonor,
  deactivateDonor,
} from "./routes/user_routes/blood-donor";
import {
  UpdateDoctor,
  getDoctor,
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
  (app.use(createUser),
  app.use(getAllUser),
  app.use(getUser),
  app.use(deleteUser),
  app.use(updateUser),
  app.use(activateDonor),
  app.use(deactivateDonor),
  app.use(UpdateDoctor),
  app.use(verifyDoctor),
  app.use(registerDoctor),
  app.use(getDoctor),
  app.use(scrapGet),
  app.use(scrapPost),
  app.use(login),
  app.use(forgetPassword),
  app.use(LikePost),
  app.use(createPost),
  app.use(deletePost),
  app.use(getAllPost),
  app.use(userPost),
  app.use(getPost),
  app.use(deleteComment),
  app.use(getComment),
  app.use(likeComment),
  app.use(postComment),
  app.use(updateComment),
  app.use(reportPost),
  app.use(spamPost),
  app.use(unverifiedDoctor),
  app.use(getServices),
  app.use(getOrganizations),
  app.use(send),
  app.use(changePassword));
