import { Router } from "express";
import dotenv from "dotenv";
import { Users } from "../models/users.js";

const proRouter = Router();

proRouter.put("/", async (req, res) => {
  const { code } = req.body;
  const userID = req.body.user._id;
  try {
    const user = await Users.findById(userID);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (code === process.env.CODE) {
      await Users.updateOne({ _id: userID }, { memberStatus: "pro" });
      res.status(200).send({ message: "Pro membership activated" });
    } else {
      res.status(400).send({ message: "Invalid code" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
});

export default proRouter;
