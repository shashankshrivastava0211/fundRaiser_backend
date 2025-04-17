const ErrorHandler = require("../utilities/ErrorHandler");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  const token = req.cookies["connect.sid"];

  if (token) {
    console.log("Token found, but user is not authenticated");
  } else {
    console.log("No session token found in cookies");
  }

  next(new ErrorHandler("User not authenticated", 401));
};

module.exports = isAuthenticated;
