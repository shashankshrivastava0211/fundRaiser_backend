const express = require("express");
const { authCobntroller } = require("../controller/authController");
const authRouter = express.Router();

authRouter.post("/signUp", authCobntroller);

module.exports = authRouter;
