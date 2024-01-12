import express from "express";
import { getMessaging } from "firebase-admin/messaging";

const notificationRouter = express.Router();

notificationRouter.post("/api/send/notifications", async (req, res) => {
  // const receivedToken = req.body.fcmToken;
  const message = {
    notification: {
      title: "Notification",
      body: "Test test test",
    },
    token:
      "cCCLsOsbSC6eKTKOWd8-wB:APA91bH1dnLe0nuZNjSiG78YbJ3jdeXURe7gDDYN3-yM28WFnnX9SXv3rCFk6bXQm4y8j3gtXiQJR2FGhDkHwu0LrCPn6_1hN2xekuZeNDX8HShWr96uMSkx4UzXXK8d9EihfSmB5Ko_",
  };
  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token:
          "cCCLsOsbSC6eKTKOWd8-wB:APA91bH1dnLe0nuZNjSiG78YbJ3jdeXURe7gDDYN3-yM28WFnnX9SXv3rCFk6bXQm4y8j3gtXiQJR2FGhDkHwu0LrCPn6_1hN2xekuZeNDX8HShWr96uMSkx4UzXXK8d9EihfSmB5Ko_",
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
});

export { notificationRouter as notification };
