import express from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../entity/User";
import { userRepository } from "../../repository";
import { createResponse } from "../../utils/response";
import { DonorSchema } from "../../zod-schema/user-schema";

const activeDonorRouter = express.Router();
const deactivateDonorRouter = express.Router();

activeDonorRouter.put("/api/donor/activate/:userName", async (req, res) => {
  const data = req.body;
  const username = req.params.userName;
  DonorSchema.parse(data);
  console.log(data);
  // userNameSchema.parse(username);
  const user = await userRepository.findOne({
    where: {
      userName: username,
    },
  });
  if (user === null) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["User Not Found"] },
    });
  }

  user.blood_Group = data["blood_Group"];
  user.is_donor = true;
  await user.save();
  return createResponse<User>(res, StatusCodes.OK, {
    status: "success",
    data: user,
  });
});

deactivateDonorRouter.put(
  "/api/donor/deactivate/:userName",
  async (req, res) => {
    const userName = req.params.userName;
    // console.log(JSON.stringify(userName));
    // userNameSchema.parse(req.params.userName);
    const user = await userRepository.findOne({
      where: {
        userName: userName,
      },
    });
    if (user === null) {
      return createResponse(res, StatusCodes.BAD_REQUEST, {
        status: "error",
        error: { message: ["User Not Found"] },
      });
    }
    user.is_donor = false;
    user.save();
    return createResponse<User>(res, StatusCodes.OK, {
      status: "success",
      data: user,
    });
  }
);

export {
  activeDonorRouter as activateDonor,
  deactivateDonorRouter as deactivateDonor,
};
