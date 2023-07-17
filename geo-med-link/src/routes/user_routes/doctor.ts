import { default as express } from "express";
import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import { Doctor } from "../../entity/Doctor";
import { doctorRepository, userRepository } from "../../repository";
import { createResponse } from "../../utils/response";

const registerRouter = express.Router();

registerRouter.post("/api/register/doctor", async (req, res) => {
  const data = req.body;
  const user = await userRepository.findOne({
    where: {
      userName: data["userName"],
    },
  });
  if (user === null) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["User Not Found"] },
    });
  }
  console.log(user);
  console.log(user.id);
  const doctor = new Doctor();
  doctor.NMC = data["NMC"];
  doctor.degree = data["degree"];
  doctor.user = user;
  const existingDoctor = await doctorRepository.findOne({
    where: { NMC: doctor.NMC },
  });
  if (existingDoctor !== null)
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["This doctor is already registered"] },
    });
  console.log(doctor);
  await doctor.save();

  return createResponse<Doctor>(res, StatusCodes.OK, {
    status: "success",
    data: doctor,
  });
});

export { registerRouter as registerDoctor };
