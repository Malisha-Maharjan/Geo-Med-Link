import { default as express } from "express";
import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import { Doctor } from "../../entity/Doctor";
import { doctorRepository, userRepository } from "../../repository";
import { sendEmail } from "../../utils/email";
import { createResponse } from "../../utils/response";

const registerRouter = express.Router();
const verifiedRouter = express.Router();
const DoctorUpdateRouter = express.Router();
registerRouter.post("/api/register/doctor", async (req, res) => {
  const data = req.body;
  const user = await userRepository.findOne({
    where: { userName: data["userName"] },
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
  await sendEmail(
    [user.email],
    "Registration Successful",
    `<h>You have been successfully Registered.</h><br/><p>Following is your NMC number</p><br/><br/><p><b>User Name: ${doctor.NMC}</b><br/></p><b>"Please update if you NMC number is incorrect. You will be shortly verified my our teams"</b><p></p></br></br><p><i>Best Regards,</i></p><p>GeoMedLink</p>`
  );

  return createResponse<Doctor>(res, StatusCodes.OK, {
    status: "success",
    data: doctor,
  });
});

verifiedRouter.put("/api/verify/doctor", async (req, res) => {
  const data = req.body;
  const user = await userRepository.findOne({
    where: { userName: data["userName"] },
  });
  if (user === null) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["User Not Found"] },
    });
  }
  const doctor = await doctorRepository.findOne({
    where: {
      user: { id: user.id },
    },
  });

  if (doctor === null) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["User Not Found"] },
    });
  }
  user.is_doctor = true;

  doctor.is_verified = true;
  await sendEmail(
    [user.email],
    "Verified Successful",
    `<h>You have been successfully verified.</h><br/><br/><br/><p><b>User Name: ${doctor.NMC}</b><br/></p><p><i>Best Regards,</i></p><p>GeoMedLink</p>`
  );
  await user.save();
  await doctor.save();
});

DoctorUpdateRouter.put("/api/doctor/update", async (req, res) => {
  const data = req.body;
  const user = await userRepository.findOne({
    where: { userName: data["userName"] },
  });
  if (user === null) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["User Not Found"] },
    });
  }
  const doctor = await doctorRepository.findOne({
    where: {
      user: { id: user.id },
    },
  });

  if (doctor === null) {
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["User Not Found"] },
    });
  }
  doctor.degree = data["degree"];
  if (doctor.NMC === data["NMC"]) {
    return createResponse(res, StatusCodes.OK, {
      status: "success",
      data: { message: "Updated" },
    });
  }
  doctor.NMC = data["NMC"];
  await sendEmail(
    [user.email],
    "Update Successful",
    `<h>Successfully updated.</h><br/><p>Following is your NMC number</p><br/><br/><p><b>NMC: ${doctor.NMC}</b><br/></p><b>"Please update if you NMC number is incorrect. You will be shortly verified my our teams"</b><p></p></br></br><p><i>Best Regards,</i></p><p>GeoMedLink</p>`
  );
  return createResponse(res, StatusCodes.OK, {
    status: "success",
    data: { message: "Updated" },
  });
});

export {
  DoctorUpdateRouter as UpdateDoctor,
  registerRouter as registerDoctor,
  verifiedRouter as verifyDoctor,
};
