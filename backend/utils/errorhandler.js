
// ErrorHandler.js
class ErrorHandler extends Error {
    constructor(message="Something went wrong !! ", statusCode, errors=[],stack = "") {
      super(message);
      this.errors = errors;
      this.message = message;
      this.statusCode = statusCode;

      this.data = null;
      this.success = false;
      

      if(stack){
      this.stack = stack;
      }
      Error.captureStackTrace(this, this.constructor);

    }
  }
   
 export default ErrorHandler;
  