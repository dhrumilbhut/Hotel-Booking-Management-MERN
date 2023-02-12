import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import customError from "../utils/customError.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {

    const newUser = await new User({
      ...req.body,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email }).select("+password");
    console.log(req.body.password)
    console.log(user.password);

    if (!user) {
      return next(customError(404, "User not found!"));
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect)
      return next(customError(400, "Wrong password !"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
