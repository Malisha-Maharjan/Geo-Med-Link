import express from "express";
import { StatusCodes } from "http-status-codes";
import { personRepository } from "../../repository";
import { createResponse } from "../../utils/response";

const activeDonorRoutes = express.Router();

activeDonorRoutes.get("/api/active/bloodDonors", async (req, res) => {
  const bloodDonors = await personRepository
    .createQueryBuilder("person")
    .leftJoinAndSelect("person.user", "user")
    .where("person.is_donor = :is_donor", { is_donor: true })
    .select(["person.id", "user.longitude", "user.latitude"])
    .getMany();
  console.log(bloodDonors);
  return createResponse(res, StatusCodes.OK, {
    status: "success",
    data: bloodDonors,
  });
});

export { activeDonorRoutes as activeDonor };
