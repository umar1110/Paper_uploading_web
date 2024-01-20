import catchAsyncFuncError from "../utils/catchAsyncFunctionError.js";

import { User } from "../Models/userModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import crypto from "crypto";
import setLoginToken from "../utils/setLoginToken.js";
import sendMail from "../utils/sendMail.js";
import FilterDb from "../utils/filterDb.js";

//Login User
export const loginUser = catchAsyncFuncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("PLease Enter both Email and Password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401)); //401 = unauthorized
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password ", 401));
  }

  setLoginToken(user, 200, res);
});

//To register user
export const registerUser = catchAsyncFuncError(async (req, res) => {
  const { name, email, password, profession } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    profession,
  });

  await user.save();

  setLoginToken(user, 200, res);
});

//To Logout
export const logoutUser = catchAsyncFuncError(async (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged Out Successfully ! ",
    });
});

//WHen user click on forget password
export const forgetPassword = catchAsyncFuncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new ErrorHandler("User Not Found ", 404);
  }

  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}:://${req.get(
    "host"
  )}/password/reset/${resetToken}`; 
  

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}\n\n If you have not requested then, ignore it`;

  try {
    await sendMail({
      email: user.email,
      subject: "Journal Password Recovery",
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} . `,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password
export const resetPassword = catchAsyncFuncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  const { password, confirmPassword } = req.body;

  if (password != confirmPassword) {
    return next(new ErrorHandler("Password not match with confirm Password"));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    user,
    message: "Password has been changed",
  });
});

// Get user details for profile
export const getMyDetails = catchAsyncFuncError(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, user });
});

//Update Password
export const updatePassword = catchAsyncFuncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please Enter all requirements", 401));
  }

  if (newPassword !== confirmNewPassword) {
    return next(new ErrorHandler("New Passwords not matched", 401));
  }

  if (oldPassword == newPassword) {
    return next(new ErrorHandler("Password can't be same", 401));
  }

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Password Not Correct", 401));
  }

  user.password = newPassword;
  await user.save();

  setLoginToken(user, 200, res);
});

//Update My Profile
export const updateProfile = catchAsyncFuncError(async (req, res) => {
  const { name, profession } = req.body;
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (!user) {
    return next(new ErrorHandler("User not Exists", 401));
  }

  user.name = name;
  user.profession = profession;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

//****************  ADMIN ****************

//get all users
export const getUsers = catchAsyncFuncError(async (req, res) => {
  // const users = await User.find();

  let filterJournals = new FilterDb(User, req.query).emailFilter().nameFilter();

  let users = await filterJournals.query.find();
  const usersCount = users.length;

  filterJournals = new FilterDb(User, req.query)
    .emailFilter()
    .nameFilter()
    .pagination(15);

  users = await filterJournals.query.find();

  res.status(200).json({
    success: true,
    users,
    totalUsers: (await User.find()).length,
    filteredUsers: usersCount,
  });

  // res.status(200).json({
  //   success: true,
  //   users,
  //   totalUsers: users.length,
  // });
});

//Delete User
export const deleteUser = catchAsyncFuncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not Exists", 401));
  }

  if (user.id === req.user.id) {
    return next(new ErrorHandler("You cannot delete yourself", 401));
  }

  await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user,
  });
});

//Get Single User details
export const getSingleUser = catchAsyncFuncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not Exists", 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Change role (admin or not)
export const changeRole = catchAsyncFuncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler("User not Exists", 401));
  }

  if (user.id === req.user.id) {
    return next(new ErrorHandler("You cannot change Your role", 401));
  }

  const { role } = req.body;

  user.role = role;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "User Role Updated successfully",
    user,
  });
});
