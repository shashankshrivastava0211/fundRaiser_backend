const express = require("express");
const { Router } = require("express");
const {
  createPayment,
} = require("../../controller/payments/paymentController");

const paymentRouter = express.Router();

paymentRouter.post("/", createPayment);

module.exports = paymentRouter;
