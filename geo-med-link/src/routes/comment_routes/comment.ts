import express from "express";
import { StatusCodes } from "http-status-codes";
import {
  commentRepository,
  postRepository,
  userRepository,
} from "../../repository";
import { paginated } from "../../types/paginated";
import { createResponse } from "../../utils/response";
import { commentSchema } from "../../zod-schema/comment-schema";
import { IdSchema } from "../../zod-schema/id-schema";

const postCommentRouter = express.Router();
const getCommentRouter = express.Router();
const likeCommentRouter = express.Router();
const deleteCommentRouter = express.Router();
const updateCommentRouter = express.Router();

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
  const page = (req.query.pageNumber as string) || "0";
  const limit = 10;
  const skip = parseInt(page) * limit;

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

  const comment = await commentRepository.find({
    where: {
      post: { id: post.id },
    },
    order: { date: "DESC" },
    take: limit,
    skip: skip,
  });
  const previous_link = `/api/comment/${data["id"]}?pageNumber=${page}`;
  const next_link = `/api/comment/${data["id"]}?pageNumber=${
    parseInt(page) + 1
  }`;
  if (!comment) {
    return res.send("not found");
  }

  const result: paginated = {
    current_page: parseInt(page),
    take: limit,
    next_page: parseInt(page) + 1,
    previous_link: previous_link,
    next_link: next_link,
    data: comment,
  };

  return createResponse(res, StatusCodes.OK, {
    status: "success",
    data: result,
  });
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

deleteCommentRouter.delete("/api/delete/comment/:id", async (req, res) => {
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

updateCommentRouter.put("/api/comment/update/:id", async (req, res) => {
  const commentID = { id: parseInt(req.params.id) };
  IdSchema.parse(commentID);
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
  const comment = await commentRepository.findOne({
    where: { id: commentID["id"] },
  });
  if (!comment) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Comment not found"] },
    });
  }
  if (!(comment.user.userName === user.userName)) {
    return createResponse(res, StatusCodes.UNAUTHORIZED, {
      status: "error",
      error: { message: ["Unauthorized access"] },
    });
  }
  comment.comment = data["comment"];
  comment.date = new Date();

  return createResponse(res, StatusCodes.OK, {
    status: "success",
    data: await comment.save(),
  });
});

export {
  deleteCommentRouter as deleteComment,
  getCommentRouter as getComment,
  likeCommentRouter as likeComment,
  postCommentRouter as postComment,
  updateCommentRouter as updateComment,
};
