const app = require("express");
const { createFundPost } = require("../controller/fundRaiser/fundRaiser");
const fundRaiserRouter = app.Router();

fundRaiserRouter.post("/createFunderaiserPost", createFundPost);

module.exports = fundRaiserRouter;
