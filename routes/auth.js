const express = require("express");
const { Router } = require("express");
const { authController } = require("../controller/authController");
const passport = require("passport");

const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    successRedirect: "http://localhost:5173",
    failureRedirect: "/auth/failure",
  })
);

authRouter.post("/signUp", authController);

authRouter.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});
authRouter.post("/logout", (req, res, next) => {
  req.logout((err) => {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid", {
        secure: false, // true in production
        httpOnly: false, // "none" in production
        sameSite: false,
      });
      res.status(200).json({ message: "Logout successful" });
    });
  });
});

module.exports = authRouter;
