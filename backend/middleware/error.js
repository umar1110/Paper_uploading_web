
import ErrorHandler from "../utils/errorhandler.js"
// this is a middleware and we used it in app.js

const errorhandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  

  // Add product without data
  if (err.name === "ValidationError") {
    const message = err.message;
    err = new ErrorHandler(message, 500); // bad request
  }

  // Mongoose duplicate email error while registering
  if (err.code === 500) {
    const message = `Duplicate  ${Object.keys(err.keyValue)} entered`;     //************************************ */
    err = new ErrorHandler(message, 400); // bad request
  }
  // Mongoose duplicate key error
  if (err.code === 11000) {
   const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
   err = new ErrorHandler(message, 400);
 }


  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = "Json web token is invalid , Try again";
    err = new ErrorHandler(message, 400); // bad request
  }

  // JWT eexpire error
  if (err.name === "TokenExpiredError") {
    const message = "Json web token is Expired , Try again";
    err = new ErrorHandler(message, 400); // bad request
  }


  // That's for  model errors 
  // like for email validation error in models 
  res.status(err.statusCode).json({
    success: false,
    error: err.message ,
    statusCode:err.statusCode
  });
  next();
};


export default errorhandler;