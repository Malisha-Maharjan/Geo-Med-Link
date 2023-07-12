import express from "express";
import { StatusCodes } from "http-status-codes";
import { Blood_Donor } from "../../entity/Blood-donor";
import { donorRepository, userRepository } from "../../repository";
import { createResponse } from "../../utils/response";
const registerDonorRouter = express.Router();
const deactivateDonorRouter = express.Router();
const activateDonorRouter = express.Router();

registerDonorRouter.post("/api/donor", async (req, res) => {
  const data = req.body;
  const user = await userRepository.findOne({
    where: {
      userName: data["userName"],
    },
  });
  if (user === null)
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["User Not found"] },
    });

  const donor = new Blood_Donor();
  donor.bloodGroup = data["bloodGroup"];

  donor.user = user;
  try {
    await donor.save();
  } catch (error) {
    return res.send("This User is already registered as Donor");
  }
  return createResponse<Blood_Donor>(res, StatusCodes.OK, {
    status: "success",
    data: donor,
  });
});

deactivateDonorRouter.post("/api/donor/deactivate", async (req, res) => {
  const data = req.body;
  const user = await userRepository.findOne({
    where: {
      userName: data["userName"],
    },
  });
  if (user === null)
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["User Not found"] },
    });
  const donor = await donorRepository.findOne({
    where: {
      user: { id: user.id },
    },
  });

  if (donor) {
    donor.is_active = false;
    donor.save();
    return createResponse<Blood_Donor>(res, StatusCodes.OK, {
      status: "success",
      data: donor,
    });
  }
  return createResponse(res, StatusCodes.BAD_REQUEST, {
    status: "error",
    error: { message: ["This user is not registered as donor."] },
  });
});

activateDonorRouter.post("/api/donor/activate", async (req, res) => {
  const data = req.body;
  const user = await userRepository.findOne({
    where: {
      userName: data["userName"],
    },
  });
  if (user === null)
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["User Not found"] },
    });
  const donor = await donorRepository.findOne({
    where: {
      user: { id: user.id },
    },
  });

  if (donor) {
    donor.is_active = true;
    donor.save();
    return createResponse<Blood_Donor>(res, StatusCodes.OK, {
      status: "success",
      data: donor,
    });
  }
  return createResponse(res, StatusCodes.BAD_REQUEST, {
    status: "error",
    error: { message: ["This user is not registered as donor."] },
  });
});

export {
  activateDonorRouter as activateDonor,
  deactivateDonorRouter as deactivateDonor,
  registerDonorRouter as registerDonor,
};
