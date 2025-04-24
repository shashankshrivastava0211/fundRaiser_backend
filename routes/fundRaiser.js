const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");
const checkValid = require("../utilities/checkPostBody");
const {
  getAllPosts,
  getSinglePost,
} = require("../controller/fundRaiser/fundRaiser");

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

const fundRaiserRouter = express.Router();
// Create Post Route
fundRaiserRouter.post(
  "/createFundRaiserPost",
  upload.single("image"),
  async (req, res) => {
    try {
      // Manual error handling
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "Image file is required",
        });
      }

      const isValid = checkValid(req.body);
      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields",
        });
      }

      const post = await Post.create({
        title: req.body.title,
        description: req.body.description,
        goal: req.body.goal,
        image: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
        endDate: req.body.endDate,
        campaignStory: req.body.campaignStory,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        category: req.body.category,
        location: req.body.location,
      });

      res.status(201).json({
        success: true,
        post,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: err.message || "Internal server error",
      });
    }
  }
);

// Get Posts Route
fundRaiserRouter.get("/fundPosts", getAllPosts);
fundRaiserRouter.get("/fundPost/:id", getSinglePost);

module.exports = fundRaiserRouter;
