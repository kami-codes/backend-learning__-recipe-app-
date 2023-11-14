import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { userName, password } = req.body;
  const user = await UserModel.findOne({ userName });

  if (user) {
    res.json({ message: "user already exists" });
    return;
  }

  const hashpass = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    userName: userName,
    password: hashpass,
  });

  await newUser.save();

  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  const user = await UserModel.findOne({ userName });

  if (!user) {
    return res.json({ message: "user doesnot exists" });
  }
  const isPassValid = await bcrypt.compare(password, user.password);

  if (!isPassValid) {
    return res.json({ message: "username or password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "SECERET");
  res.json({ token, userId: user._id });
});

export { router as userRouter };
