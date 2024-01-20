import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required for user"],
    },

    email: {
      type: String,
      required: [true, "Email required for user"],
      unique: [true, "Email already exists"],
      validate: [validator.isEmail, "Please Enter valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required for user"],
      minLength: [8, "Password should must be greater than 8 characters"],
      select: false,
    },

    role: {
      type: String,
      default: "user",
      enum :["admin","user"]
    },
    profession: {
      // student , professot etc
      type: String,
      required: true,
    },

    resetPasswordToken: String,
    resetPasswordTokenExpire: String,
  },
  { timestamps: true }
);

//Encrypt password using bcrypt before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//compare password to login by decrypt using bcrypt
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// To get reset password token
// I will get this token when user click on forget password and send it to their email as a link ,
//than get token from url as params and than compare both tokens
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Expire will be 15min
  this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

//create jwt token to store it in cookie for login authentication
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
