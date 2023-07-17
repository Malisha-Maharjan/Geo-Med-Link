// import express from "express";
// import { StatusCodes } from "http-status-codes";
// import { Blood_Donor } from "../../entity/Blood-donor";
// import { donorRepository, userRepository } from "../../repository";
// import { createResponse } from "../../utils/response";
// const registerDonorRouter = express.Router();
// const deactivateDonorRouter = express.Router();
// const activateDonorRouter = express.Router();

// registerDonorRouter.post("/api/donor", async (req, res) => {
//   const data = req.body;
//   const user = await userRepository.findOne({
//     where: {
//       userName: data["userName"],
//     },
//   });
//   if (user === null)
//     return createResponse(res, StatusCodes.BAD_REQUEST, {
//       status: "error",
//       error: { message: ["User Not found"] },
//     });

//   const donor = new Blood_Donor();
//   donor.bloodGroup = data["bloodGroup"];

//   donor.user = user;
//   try {
//     await donor.save();
//   } catch (error) {
//     return res.send("This User is already registered as Donor");
//   }
//   return createResponse<Blood_Donor>(res, StatusCodes.OK, {
//     status: "success",
//     data: donor,
//   });
// });

// deactivateDonorRouter.post("/api/donor/deactivate", async (req, res) => {
//   const data = req.body;
//   const user = await userRepository.findOne({
//     where: {
//       userName: data["userName"],
//     },
//   });
//   if (user === null)
//     return createResponse(res, StatusCodes.BAD_REQUEST, {
//       status: "error",
//       error: { message: ["User Not found"] },
//     });
//   const donor = await donorRepository.findOne({
//     where: {
//       user: { id: user.id },
//     },
//   });

//   if (donor) {
//     donor.is_active = false;
//     donor.save();
//     return createResponse<Blood_Donor>(res, StatusCodes.OK, {
//       status: "success",
//       data: donor,
//     });
//   }
//   return createResponse(res, StatusCodes.BAD_REQUEST, {
//     status: "error",
//     error: { message: ["This user is not registered as donor."] },
//   });
// });

// activateDonorRouter.post("/api/donor/activate", async (req, res) => {
//   const data = req.body;
//   const user = await userRepository.findOne({
//     where: {
//       userName: data["userName"],
//     },
//   });
//   if (user === null)
//     return createResponse(res, StatusCodes.BAD_REQUEST, {
//       status: "error",
//       error: { message: ["User Not found"] },
//     });
//   const donor = await donorRepository.findOne({
//     where: {
//       user: { id: user.id },
//     },
//   });

//   if (donor) {
//     donor.is_active = true;
//     donor.save();
//     return createResponse<Blood_Donor>(res, StatusCodes.OK, {
//       status: "success",
//       data: donor,
//     });
//   }
//   return createResponse(res, StatusCodes.BAD_REQUEST, {
//     status: "error",
//     error: { message: ["This user is not registered as donor."] },
//   });
// });

// export {
//   activateDonorRouter as activateDonor,
//   deactivateDonorRouter as deactivateDonor,
//   registerDonorRouter as registerDonor,
// };

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
  if (user !== null) {
    user.blood_Group = data["blood_Group"];
    user.is_donor = true;
    user.save();
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
    if (user !== null) {
      user.is_donor = false;
      user.save();
      return createResponse<User>(res, StatusCodes.OK, {
        status: "success",
        data: user,
      });
    }
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["User Not Found"] },
    });
  }
);

export {
  activeDonorRouter as activateDonor,
  deactivateDonorRouter as deactivateDonor,
};
