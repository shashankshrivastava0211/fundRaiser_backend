const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.status = err.status || 500;
  res.status(err.status).json({
    success: false,
    message: err.message,
    status: err.status,
  });
  console.error(err);
  next();
};

module.exports = errorMiddleware;
