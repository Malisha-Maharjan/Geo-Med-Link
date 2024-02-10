import express from "express";
import { StatusCodes } from "http-status-codes";
import { Post } from "../../entity/Post";
import { postRepository } from "../../repository";
import { createResponse } from "../../utils/response";

const spamPostRouter = express.Router();
const spamVerifiedRouter = express.Router();

spamPostRouter.get("/api/spam", async (req, res) => {
  const post = await postRepository.find({
    where: {
      reported_spam: 1,
    },
  });
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

spamVerifiedRouter.put("/api/spam/verify", async (req, res) => {
  const post = await postRepository.findOne({
    where: {
      id: req.body["id"],
    },
  });
  if (post === null || !post) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Post not available"] },
    });
  }
  post.is_spam = true;
  post.save();
  return createResponse(res, StatusCodes.OK, {
    status: "success",
    data: { message: "Verified" },
  });
});

export { spamPostRouter as spamPost, spamVerifiedRouter as spamVerified };
