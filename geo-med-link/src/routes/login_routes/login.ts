import express from "express";
import { userRepository } from "../../repository";

const router = express.Router();

router.post("/api/login", async (req, res) => {
  const data = req.body;
  const user = await userRepository.findOne({
    where: {
      userName: data["userName"],
      password: data["password"],
    },
  });
  if (user) {
    return res.send(user).status(200);
  }
  return res.send("Invalid Username Or Password").status(404);
});

export { router as login };
