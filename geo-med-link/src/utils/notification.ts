import express from "express";
import { getMessaging } from "firebase-admin/messaging";
import { StatusCodes } from "http-status-codes";
import { services } from "../enum/services";
import {
  organizationRepository,
  personRepository,
  userRepository,
} from "../repository";
import { createResponse } from "./response";

const requestBloodNotificationRouter = express.Router();
const respondBloodNotificationRouter = express.Router();
const requestAmbulanceNotificationRouter = express.Router();
const respondAmbulanceNotificationRouter = express.Router();

requestBloodNotificationRouter.post(
  "/api/send/notifications/request/blood",
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
      data: data,
      // data: {
      //   userName: user.userName,
      //   phoneNumber,
      //   longitude,
      //   latitude,
      //   requestId: data["requestId"],
      // },
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

respondBloodNotificationRouter.post(
  "/api/send/notifications/respond/blood",
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
      data: data,
      // data: {
      //   userName: receiver.userName,
      //   phoneNumber,
      //   longitude: data["longitude"],
      //   latitude: data["latitude"],
      //   requestId: data["requestId"],
      // },
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

requestAmbulanceNotificationRouter.post(
  "/api/send/notifications/request/ambulance",
  async (req, res) => {
    const data = req.body;
    const username = data["userName"];
    const user = await userRepository
      .createQueryBuilder("user")
      .where("user.userName = :username", { username })
      .getOne();
    if (!user)
      return createResponse(res, StatusCodes.BAD_REQUEST, {
        status: "error",
        error: { message: ["User not found."] },
      });
    const ambulances = await organizationRepository
      .createQueryBuilder("organization")
      .leftJoinAndSelect("organization.user", "user")
      .where("organization.blood_Group = :organizationType", {
        organizationType: services.AMBULANCE,
      })
      .andWhere("user.is_active = :isActive and user.userName != :username", {
        isActive: false,
        username: username,
      })
      .select(["organization.id", "user.deviceId"])
      .getMany();

    if (!ambulances || ambulances.length === 0) {
      return createResponse(res, StatusCodes.BAD_REQUEST, {
        status: "error",
        error: { message: ["No any active user found."] },
      });
    }
    const deviceId = ambulances.map((ambulance) => ambulance.user.deviceId);
    const message = {
      notification: {
        title: "Notification",
        body: "Test test test",
      },
      tokens: deviceId,
      data: data,
      // data: {
      //   userName: user.userName,
      //   phoneNumber,
      //   longitude,
      //   latitude,
      //   requestId: data["requestId"],
      // },
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

respondBloodNotificationRouter.post(
  "/api/send/notifications/respond/ambulance",
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
    const message = {
      notification: {
        title: "Notification",
        body: "Test test test",
      },
      token: requester.deviceId,
      data: data,
      // data: {
      //   userName: receiver.userName,
      //   phoneNumber,
      //   longitude: data["longitude"],
      //   latitude: data["latitude"],
      //   requestId: data["requestId"],
      // },
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

export { requestBloodNotificationRouter as notification };
