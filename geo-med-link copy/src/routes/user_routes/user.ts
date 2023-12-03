// import { default as express } from "express";
// import "express-async-errors";
// import { StatusCodes } from "http-status-codes";
// import { User } from "../../entity/User";
// import { userRepository } from "../../repository";
// import { sendEmail } from "../../utils/email";
// import { createResponse } from "../../utils/response";
// import { validate } from "../../validation-zod";
// import { createUserSchema, userNameSchema } from "../../zod-schema/user-schema";

// const createRouter = express.Router();
// const getAllRouter = express.Router();
// const deleteRouter = express.Router();
// const getRouter = express.Router();
// const updateRouter = express.Router();

// createRouter.post("/api/user", async (req, res) => {
//   const userDTO = validate(createUserSchema, req.body);
//   const existingUser = await userRepository.findOne({
//     where: {
//       userName: userDTO.userName,
//     },
//   });
//   console.log(existingUser);
//   if (existingUser)
//     return createResponse(res, StatusCodes.BAD_REQUEST, {
//       status: "error",
//       error: {
//         userName: ["Username already exists."],
//       },
//     });
//   await sendEmail(
//     [userDTO.email],
//     "Registration Successful",
//     `<h>You have been successfully Registered.</h><br/><p>Following is your login credentials.</p><br/><br/><p><b>User Name: ${userDTO.userName}</b><br/></p><b>Password:${userDTO.password}</b><p></p></br></br><p><i>Best Regards,</i></p><p>GeoMedLink</p>`
//   );
//   return createResponse<User>(res, StatusCodes.OK, {
//     status: "success",
//     data: await userRepository.create(userDTO).save(),
//   });
// });

// getAllRouter.get("/api/user/all", async (req, res) => {
//   const user = await userRepository.find();
//   console.log(user);
//   if (user.length === 0)
//     return createResponse(res, StatusCodes.BAD_REQUEST, {
//       status: "error",
//       error: { message: ["Bad Request"] },
//     });
//   return createResponse<User[]>(res, StatusCodes.OK, {
//     status: "success",
//     data: user,
//   });
// });

// deleteRouter.delete("/api/user/:username", async (req, res) => {
//   const data = { userName: req.params.username };
//   userNameSchema.parse(data);
//   const user = await userRepository.findBy({ userName: data["userName"] });
//   if (user.length === 0) {
//     return createResponse(res, StatusCodes.BAD_REQUEST, {
//       status: "error",
//       error: {
//         message: ["User Not Found"],
//       },
//     });
//   }

//   await userRepository.delete({ userName: data["userName"] });
//   return createResponse(res, StatusCodes.OK, {
//     status: "success",
//   });
// });

// getRouter.get("/api/user/:username", async (req, res) => {
//   const data = { userName: req.params.username };
//   userNameSchema.parse(data);
//   const user = await userRepository.findOne({
//     where: {
//       userName: data["userName"],
//     },
//   });
//   if (user === null)
//     return createResponse(res, StatusCodes.BAD_REQUEST, {
//       status: "error",
//       error: { message: ["User Not Found"] },
//     });
//   return createResponse<User>(res, StatusCodes.OK, {
//     status: "success",
//     data: user,
//   });
// });

// updateRouter.put("/api/user", async (req, res) => {
//   console.log(req.body);
//   const userDTO = validate(createUserSchema, req.body);
//   const userName = userDTO.userName;
//   console.log("hello");
//   const user = await userRepository.findOne({
//     where: {
//       userName: userName,
//     },
//   });
//   if (user !== null) {
//     userRepository.merge(user, userDTO).save();
//     return createResponse<User>(res, StatusCodes.OK, {
//       status: "success",
//       data: user,
//     });
//   }
//   return createResponse(res, StatusCodes.BAD_REQUEST, {
//     status: "error",
//     error: { message: ["User Not Found"] },
//   });
// });

// export {
//   createRouter as createUser,
//   deleteRouter as deleteUser,
//   getAllRouter as getAllUser,
//   getRouter as getUser,
//   updateRouter as updateUser,
// };
