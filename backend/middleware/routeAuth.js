import jwt from "jsonwebtoken";
import catchAsyncFuncError from "../utils/catchAsyncFunctionError.js";
import ErrorHandler from "../utils/errorhandler.js";
import { User } from "../Models/userModel.js";

export const isAuthenticatedUser = catchAsyncFuncError(
  async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler("Please Login First.....", 401));
    }

    try {
      const decodedDataID = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedDataID.id);
    } catch (error) {
      next(new ErrorHandler("User Not Exists !! ", 401));
    }

    next();
  }
);

export const isAuthenticatedRole = catchAsyncFuncError(
  async (req, res, next) => {
    const { role } = req.user;

    if (role !== "admin") {
      return next(new ErrorHandler("Only admins are allowed to access"));
    }

    
    next();
  }
);
