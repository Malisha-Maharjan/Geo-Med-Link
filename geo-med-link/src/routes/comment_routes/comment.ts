import express from "express";
import { StatusCodes } from "http-status-codes";
import {
  commentRepository,
  postRepository,
  userRepository,
} from "../../repository";
import { createResponse } from "../../utils/response";
import { commentSchema } from "../../zod-schema/comment-schema";
import { IdSchema } from "../../zod-schema/id-schema";

const postCommentRouter = express.Router();
const getCommentRouter = express.Router();
const likeCommentRouter = express.Router();
const deleteCommentRouter = express.Router();

postCommentRouter.post("/api/comment", async (req, res) => {
  const data = req.body;
  commentSchema.parse(data);
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
  const post = await postRepository.findOne({
    where: {
      id: data["postId"],
    },
  });
  if (!post) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Post not found"] },
    });
  }
  const comment = commentRepository.create();
  comment.comment = data["comment"];
  comment.user = user;
  comment.post = post;
  comment.date = new Date();

  return createResponse(res, StatusCodes.OK, {
    status: "success",
    data: await comment.save(),
  });
});

getCommentRouter.get("/api/comment/:postId", async (req, res) => {
  const data = { id: parseInt(req.params.postId) };
  IdSchema.parse(data);

  const post = await postRepository.findOne({
    where: {
      id: data["id"],
    },
  });
  if (!post) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Post not found"] },
    });
  }

  const comment = await commentRepository.findAndCount({
    where: {
      post: { id: post.id },
    },
    order: { date: "DESC" },
    take: 10,
  });
  if (!comment) {
    return res.send("not found");
  }

  return res.send(comment);
});

likeCommentRouter.put("/api/comment/like/:id", async (req, res) => {
  const commentId = { id: parseInt(req.params.id) };
  const comment = await commentRepository.findOne({
    where: {
      id: commentId["id"],
    },
  });
  if (!comment) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Comment not available"] },
    });
  }
  comment.likes = comment.likes + 1;
  await comment.save();
  return createResponse(res, StatusCodes.OK, {
    status: "success",
    data: "Like Updated",
  });
});

deleteCommentRouter.post("/api/delete/comment/:id", async (req, res) => {
  const commentId = { id: parseInt(req.params.id) };
  const comment = await commentRepository.findOne({
    where: {
      id: commentId["id"],
    },
  });
  if (!comment) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Comment not available"] },
    });
  }
  await commentRepository.delete({ id: commentId["id"] });
  return createResponse(res, StatusCodes.OK, {
    status: "success",
    data: { message: "successfully deleted" },
  });
});

export {
  deleteCommentRouter as deleteComment,
  getCommentRouter as getComment,
  likeCommentRouter as likeComment,
  postCommentRouter as postComment,
};
