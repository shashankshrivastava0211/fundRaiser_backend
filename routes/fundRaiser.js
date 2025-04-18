const app = require("express");
const {
  createFundPost,
  getAllPosts,
} = require("../controller/fundRaiser/fundRaiser");
const upload = require("../config/multer");
const fundRaiserRouter = app.Router();

fundRaiserRouter.post("/createFundRaiserPost",upload.single("image"), createFundPost);
fundRaiserRouter.get("/createFundRaiserPost", getAllPosts);

module.exports = fundRaiserRouter;
