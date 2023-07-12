import { default as express } from "express";
import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import { User } from "../../entity/User";
import { userRepository } from "../../repository";
import { createResponse } from "../../utils/response";
import { validate } from "../../validation-zod";
import { createUserSchema } from "../../zod-schema/user-schema";

const createRouter = express.Router();
const getAllRouter = express.Router();
const deleteRouter = express.Router();
const getRouter = express.Router();
const updateRouter = express.Router();

createRouter.post("/api/user", async (req, res) => {
  const userDTO = validate(createUserSchema, req.body);
  const existingUser = await userRepository.findBy({
    userName: userDTO.userName,
  });
  console.log(existingUser);
  if (existingUser.length !== 0) {
    return createResponse<User>(res, StatusCodes.OK, {
      status: "success",
      data: await userRepository.create(userDTO).save(),
    });
  }
  console.log(existingUser);
  return createResponse(res, StatusCodes.BAD_REQUEST, {
    status: "error",
    error: {
      userName: ["Username already exists."],
    },
  });
});

getAllRouter.get("/api/user/all", async (req, res) => {
  const user = await userRepository.find();
  console.log(user);
  if (user.length === 0)
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Bad Request"] },
    });
  return createResponse<User[]>(res, StatusCodes.OK, {
    status: "success",
    data: user,
  });
});

deleteRouter.delete("/api/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await userRepository.findBy({ id: userId });
  if (user.length === 0) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: {
        message: ["User Not Found"],
      },
    });
  }

  await userRepository.delete({ id: userId });
  return createResponse(res, StatusCodes.OK, {
    status: "success",
  });
});

getRouter.get("/api/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await userRepository.findBy({ id: userId });
  if (user.length === 0)
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["User Not Found"] },
    });

  return createResponse<User[]>(res, StatusCodes.OK, {
    status: "success",
    data: user,
  });
});

updateRouter.put("/api/user", async (req, res) => {
  console.log(req.body);
  const userDTO = validate(createUserSchema, req.body);
  const userName = userDTO.userName;
  console.log("hello");
  const user = await userRepository.findOne({
    where: {
      userName: userName,
    },
  });
  if (user !== null) {
    userRepository.merge(user, userDTO).save();
    return createResponse<User>(res, StatusCodes.OK, {
      status: "success",
      data: user,
    });
  }
  return createResponse(res, StatusCodes.BAD_REQUEST, {
    status: "error",
    error: { message: ["User Not Found"] },
  });
});

export {
  createRouter as createUser,
  deleteRouter as deleteUser,
  getAllRouter as getAllUser,
  getRouter as getUser,
  updateRouter as updateUser,
};
