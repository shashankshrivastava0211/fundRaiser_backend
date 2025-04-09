const app = require("express");
const {
  createFundPost,
  getAllPosts,
} = require("../controller/fundRaiser/fundRaiser");
const fundRaiserRouter = app.Router();

fundRaiserRouter.post("/createFundRaiserPost", createFundPost);
fundRaiserRouter.get("/createFundRaiserPost", getAllPosts);

module.exports = fundRaiserRouter;
