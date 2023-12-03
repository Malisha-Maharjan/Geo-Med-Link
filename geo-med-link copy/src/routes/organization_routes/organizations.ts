// import express from "express";
// import { StatusCodes } from "http-status-codes";
// import { Organization } from "../../entity/Organization";
// import { organizationRepository } from "../../repository";
// import { createResponse } from "../../utils/response";
// import { createOrganizationSchema } from "../../zod-schema/organization-schema";

// const createRouter = express.Router();
// const deleteRouter = express.Router();
// const getRouter = express.Router();

// export enum OrganizationTypes {
//   HOSPITAL = 1,
//   CLINIC = 2,
//   AMBULANCE = 3,
// }

// createRouter.post("/api/organization", async (req, res) => {
//   console.log(req.body);
//   const organizationDTO = createOrganizationSchema.parse(req.body);
//   console.log(organizationDTO);
//   const existingUser = await organizationRepository.findOne({
//     where: {
//       userName: organizationDTO.userName,
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
//   return createResponse(res, StatusCodes.OK, {
//     status: "success",
//     data: await organizationRepository.create(organizationDTO).save(),
//   });
// });

// deleteRouter.delete("/api/organization/:id", async (req, res) => {
//   const organizationId = parseInt(req.params.id);
//   const organization = await organizationRepository.findBy({
//     id: organizationId,
//   });
//   if (organization.length === 0) {
//     return createResponse(res, StatusCodes.BAD_REQUEST, {
//       status: "error",
//       error: {
//         message: ["Organization Not Found"],
//       },
//     });
//   }
//   await organizationRepository.delete({ id: organizationId });
//   return createResponse(res, StatusCodes.OK, {
//     status: "success",
//   });
// });

// getRouter.get("/api/organization/:id", async (req, res) => {
//   const organizationId = parseInt(req.params.id);
//   const organization = await organizationRepository.findBy({
//     id: organizationId,
//   });
//   if (organization.length === 0)
//     return createResponse(res, StatusCodes.BAD_REQUEST, {
//       status: "error",
//       error: { message: ["User Not Found"] },
//     });

//   return createResponse<Organization[]>(res, StatusCodes.OK, {
//     status: "success",
//     data: organization,
//   });
// });

// export {
//   createRouter as createOrganization,
//   deleteRouter as deleteOrganization,
//   getRouter as getOrganization,
// };
