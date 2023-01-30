import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [50, "Name must be less than 50 characters"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be atleast 8 characters long"],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Phone Number is required"],
      minLength: [10, "Phone number must be 10 digits"],
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
  },
  {
    timestamps: true,
  }
);

// Password encryption before saving to db
userSchema.pre("save", async function (next) {
  if (!this.Modified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Schema methods
userSchema.methods = {
  //Compare Password
  comparePassword: async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  },

  //Generate JWT token
  getJwtToken: function () {
    return JWT.sign(
      { _id: this._id, role: this.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },
};

export default mongoose.model("User", userSchema);
