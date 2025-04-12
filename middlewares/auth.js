const ErrorHandler = require("../utilities/ErrorHandler");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  const token = req.cookies["connect.sid"];
  if (token) {
    return next(new ErrorHandler("User not authenticated", 401));
    console.log("Token found, but user is not authenticated");
  } else {
    console.log("No token found");
  }
  console.log("Unauthorized access attempt", req.cookies["connect.sid"]);
  res.status(401).json({ message: "Unauthorized" });
};

module.exports = isAuthenticated;
