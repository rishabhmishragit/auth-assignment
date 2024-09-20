import express from "express";
import userModule from "../models/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import Token from "../models/token.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const { User } = userModule;

const router = express.Router();

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).send({ message: "Email Not Found" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(401).send({ message: "Invalid Password" });

    if (!user?.varified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}/users/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }

      return res
        .status(400)
        .send({ message: "An Email sent to your account, Please verify." });
    }

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
