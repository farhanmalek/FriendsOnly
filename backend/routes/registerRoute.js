import { Router } from "express";
import { Users } from "../models/users.js";
import bcrypt from "bcryptjs";

const registerRoute = Router();

//Route to create a registered user.
registerRoute.post("/", async (req, res) => {
  let member = "member";
  try {
    if (
      !req.body.email ||
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.password
    ) {
      return res.status(400).send({ message: "Required field(s) missing" });
    }
    if (req.body.email === "farhan@gmail.com") {
      member = "admin";
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {   
        const userExists = await Users.findOne({email: req.body.email});
        if (userExists) {
          res.status(400).send({ message: "User Already Exists! " });
        } else {
          const newUser = {
            email: req.body.email,
            firstname: req.body.first,
            lastname: req.body.last,
            password: hashedPassword,
            memberStatus: member,
          };
          const user = await Users.create(newUser);
          return res.status(200).send({ message: "Registration Successful!" });
        }
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default registerRoute;
