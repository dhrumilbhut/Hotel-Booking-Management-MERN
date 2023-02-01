import User from "../models/user.schema.js";
import customError from "../utils/customError.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      phone,
    });

    res.status(200).send("User has been created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(401).send("email and password is required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(customError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return next(customError(404, "Wrong password or email"));

    const token = JWT.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    user.password = undefined;
    user.isAdmin = undefined;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
    console.log(error);
  }
};
