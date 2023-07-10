import { default as express } from "express";
import "express-async-errors";
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
    console.log(existingUser);
    return createResponse(res, 400, {
      status: "error",
      error: {
        userName: ["Username already exists."],
      },
    });
  }

  return createResponse<User>(res, 400, {
    status: "success",
    data: await userRepository.create(userDTO).save(),
  });
});

getAllRouter.get("/api/user/all", async (req, res) => {
  const user = await userRepository.find();
  console.log(user);
  if (user.length !== 0)
    return createResponse<User[]>(res, 200, {
      status: "success",
      data: user,
    });
  return createResponse(res, 400, {
    status: "error",
    error: { message: ["Bad Request"] },
  });
});

deleteRouter.delete("/api/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await userRepository.findBy({ id: userId });
  if (user.length !== 0) {
    await userRepository.delete({ id: userId });
    return createResponse(res, 200, {
      status: "success",
      data: "User deleted",
    });
  }
  return createResponse(res, 400, {
    status: "error",
    error: {
      message: ["User Not Found"],
    },
  });
});

getRouter.get("/api/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await userRepository.findBy({ id: userId });
  if (user.length !== 0)
    return createResponse<User[]>(res, 200, {
      status: "success",
      data: user,
    });
  return createResponse(res, 400, {
    status: "error",
    error: { message: ["User Not Found"] },
  });
});

updateRouter.put("/api/user", async (req, res) => {
  console.log(req.body);
  const userDTO = validate(createUserSchema, req.body);
  const userName = userDTO.userName;
  const user = await userRepository.findOne({
    where: {
      userName: userName,
    },
  });
  if (user !== null) {
    userRepository.merge(user, userDTO).save();
    return createResponse<User>(res, 200, {
      status: "success",
      data: user,
    });
  }
  return createResponse(res, 400, {
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
