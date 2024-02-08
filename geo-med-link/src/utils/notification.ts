import express from "express";
import { getMessaging } from "firebase-admin/messaging";
import { StatusCodes } from "http-status-codes";
import { personRepository, userRepository } from "../repository";
import { createResponse } from "./response";

const requestNotificationRouter = express.Router();
const receiveNotificationRouter = express.Router();

requestNotificationRouter.post(
  "/api/send/notifications/request",
  async (req, res) => {
    const data = req.body;
    console.log({ data });
    const bloodGroup = data["bloodGroup"];
    const username = data["userName"];
    const longitude = data["longitude"];
    const latitude = data["latitude"];
    const user = await userRepository
      .createQueryBuilder("user")
      .where("user.userName = :username", { username })
      .getOne();
    if (!user) return res.send("Error");
    const persons = await personRepository
      .createQueryBuilder("person")
      .leftJoinAndSelect("person.user", "user")
      .where("person.blood_Group = :bloodGroup", { bloodGroup })
      .andWhere("user.is_active = :isActive and user.userName != :username", {
        isActive: false,
        username: username,
      })
      .select(["person.id", "user.deviceId"])
      .getMany();
    console.log(JSON.stringify({ persons }, null, 2));
    if (!persons || persons.length === 0) {
      return createResponse(res, StatusCodes.BAD_REQUEST, {
        status: "error",
        error: { message: ["No any active user found."] },
      });
    }
    const phoneNumber = !user.phoneNumber ? "" : user.phoneNumber;

    // const user_photo = !user.user_photo ? "" : user.user_photo;
    const deviceId = persons.map((person) => person.user.deviceId);
    console.log({ phoneNumber });
    // console.log({ user_photo });
    console.log(deviceId);
    const message = {
      notification: {
        title: "Notification",
        body: "Test test test",
      },
      tokens: deviceId,
      data: {
        userName: user.userName,
        phoneNumber,
        longitude,
        latitude,
        requestId: data["requestId"],
      },
    };
    getMessaging()
      .sendEachForMulticast(message)
      .then((response) => {
        return createResponse(res, StatusCodes.OK, {
          status: "success",
          data: { message: "Notification Send" },
        });
      })
      .catch((error) => {
        console.log({ error });
        return createResponse(res, StatusCodes.BAD_REQUEST, {
          status: "error",
          error: { message: ["Error occurred"] },
        });
      });
  }
);

receiveNotificationRouter.post(
  "/api/send/notifications/receive",
  async (req, res) => {
    const data = req.body;
    const requestId = data["resquestId"];
    const requestUser = data["request_useName"];
    const receiveUser = data["receive_userName"];
    const receiver = await userRepository
      .createQueryBuilder("user")
      .where("user.userName = :username", { receiveUser })
      .getOne();
    const requester = await userRepository
      .createQueryBuilder("user")
      .where("user.userName = :username", { requestUser })
      .getOne();
    if (!receiver || !requester) return res.send("Error");
    const phoneNumber = !receiver.phoneNumber ? "" : receiver.phoneNumber;
    const message = {
      notification: {
        title: "Notification",
        body: "Test test test",
      },
      token: requester.deviceId,
      data: {
        userName: receiver.userName,
        phoneNumber,
        longitude: data["longitude"],
        latitude: data["latitude"],
        requestId: data["requestId"],
      },
    };
    getMessaging()
      .send(message)
      .then((response) => {
        return createResponse(res, StatusCodes.OK, {
          status: "success",
          data: { message: "Notification Send" },
        });
      })
      .catch((error) => {
        console.log({ error });
        return createResponse(res, StatusCodes.BAD_REQUEST, {
          status: "error",
          error: { message: ["Error occurred"] },
        });
      });
  }
);

export { requestNotificationRouter as notification };
