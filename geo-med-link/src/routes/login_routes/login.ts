import express from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../entity/User";
import { userRepository } from "../../repository";
import { sendEmail } from "../../utils/email";
import { createResponse } from "../../utils/response";
import { loginSchema } from "../../zod-schema/user-schema";
import { createToken } from "./jwt";

const router = express.Router();

router.post("/api/login", async (req, res) => {
  loginSchema.parse(req.body);
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
  const token = createToken(user.id, user.userName);
  await sendEmail([user.email], "GEOMEDLINK", "<p>hi<p>");
  return createResponse(res, StatusCodes.OK, {
    status: "success",
    data: token,
  });
});

export { router as login };
