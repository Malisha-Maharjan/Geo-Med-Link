import express from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../entity/User";
import { userRepository } from "../../repository";
import { createResponse } from "../../utils/response";

const router = express.Router();

router.post("/api/login", async (req, res) => {
  const data = req.body;
  const user = await userRepository.findOne({
    where: {
      userName: data["userName"],
      password: data["password"],
    },
  });
  if (!user) {
    return createResponse<User>(res, StatusCodes.UNAUTHORIZED, {
      status: "error",
      error: { message: ["Invalid Username Or Password"] },
    });
  }
  return createResponse<User>(res, StatusCodes.OK, {
    status: "success",
    data: user,
  });
});

export { router as login };
