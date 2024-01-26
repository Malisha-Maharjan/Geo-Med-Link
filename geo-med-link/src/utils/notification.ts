import express from "express";
// import { getMessaging } from "firebase-admin/messaging";
// import { personRepository } from "../repository";

const notificationRouter = express.Router();

notificationRouter.post("/api/send/notifications/request", async (req, res) => {
  //   const data = req.body;
  //   const bloodGroup = data["bloodGroup"];
  //   const persons = await personRepository
  //     .createQueryBuilder("person")
  //     .leftJoinAndSelect("person.user", "user")
  //     .where("person.blood_Group = :bloodGroup", { bloodGroup })
  //     .andWhere("user.is_active = :isActive", { isActive: false })
  //     .select(["person.id", "user.deviceId"])
  //     .getMany();
  //   const deviceId = persons.map((person) => person.user.deviceId);
  //   console.log(deviceId);
  //   const message = {
  //     notification: {
  //       title: "Notification",
  //       body: "Test test test",
  //     },
  //     tokens: deviceId,
  //     data: {
  //       username: "Malisha",
  //     },
  //   };
  //   getMessaging()
  //     .sendEachForMulticast(message)
  //     .then((response) => {
  //       res.status(200).json({
  //         message: "Successfully sent message",
  //         token: deviceId,
  //       });
  //       console.log("Successfully sent message:", response);
  //     })
  //     .catch((error) => {
  //       res.status(400);
  //       res.send(error);
  //       console.log("Error sending message:", error);
  //     });
});

export { notificationRouter as notification };
