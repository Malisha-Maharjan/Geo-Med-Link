import express from "express";
import { StatusCodes } from "http-status-codes";
import { Post } from "../../entity/Post";
import { postRepository, userRepository } from "../../repository";

import { createResponse } from "../../utils/response";
import { createPostSchema } from "../../zod-schema/post-post";
import { userNameSchema } from "../../zod-schema/user-schema";

const createPostRouter = express.Router();
const likePostRouter = express.Router();
const getPostRouter = express.Router();
const getPostOfUserRouter = express.Router();
const getAllPostRouter = express.Router();

createPostRouter.post("/api/post/create", async (req, res) => {
  const data = req.body;
  createPostSchema.parse(data);
  console.log(data[""]);
  const user = await userRepository.findOne({
    where: {
      userName: data["userName"],
    },
  });

  if (!user) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["User not found"] },
    });
  }

  if (data["post"] && data["photo"]) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Null post"] },
    });
  }
  console.log(user);
  const post = postRepository.create();
  post.photo = data["photo"];
  post.user = user;
  post.date = new Date();
  post.post = data["post"];

  return createResponse<Post>(res, StatusCodes.OK, {
    status: "success",
    data: await post.save(),
  });
});

likePostRouter.put("/api/post/like/:id", async (req, res) => {
  const postId = { id: parseInt(req.params.id) };
  const post = await postRepository.findOne({
    where: {
      id: postId["id"],
    },
  });
  if (!post) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Post not available"] },
    });
  }
  post.likes = post.likes + 1;
  post.save();
  return createResponse(res, StatusCodes.OK, {
    status: "success",
    data: "Like Updated",
  });
});

getPostRouter.get("/api/post/get/:id", async (req, res) => {
  const postId = { id: parseInt(req.params.id) };
  const post = await postRepository.findOne({
    where: {
      id: postId["id"],
    },
  });

  if (!post) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Post not available"] },
    });
  }
  console.log(post);
  return createResponse<Post>(res, StatusCodes.OK, {
    status: "success",
    data: post,
  });
});

getPostOfUserRouter.get("/api/post/get/:userName", async (req, res) => {
  const data = { userName: req.params.userName };
  userNameSchema.parse(data);
  const user = await userRepository.findOne({
    where: {
      userName: data["userName"],
    },
  });
  if (!user) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["User not available"] },
    });
  }

  const post = await postRepository.findBy({ user: { id: user.id } });
  if (post === null) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Post not available"] },
    });
  }
  return createResponse<Post[]>(res, StatusCodes.OK, {
    status: "success",
    data: post,
  });
});

getAllPostRouter.get("/api/post/all", async (req, res) => {
  const post = await postRepository.find();
  if (post === null) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Post not available"] },
    });
  }
  return createResponse<Post[]>(res, StatusCodes.OK, {
    status: "success",
    data: post,
  });
});

export {
  likePostRouter as LikePost,
  createPostRouter as createPost,
  getAllPostRouter as getAllPost,
  getPostRouter as getPost,
};
