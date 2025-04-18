const e = require("express");
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [5, "Title must be at least 5 characters long"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [20, "Description must be at least 20 characters long"],
  },
  image: {
    data: Buffer,
    contentType: String, // MIME type of the image
  },

  category: {
    type: String,
    enum: {
      values: [
        "Health",
        "Education",
        "Environment",
        "Animal Welfare",
        "Disaster Relief",
        "Other",
      ],
      message:
        "Category must be one of 'Health', 'Education', 'Environment', 'Animal Welfare', 'Disaster Relief', or 'Other'",
    },
    required: [true, "Category is required"],
  },
  endDate:{type :Date},
  campaignStory:{type:String},
  contactEmail:{type:String},
  contactPhone:{type:String},
  location: {
    type: String,
    // required: [true, "Location is required"],
  },
  goal: {
    type: Number,
    default: 0,
    required: [true, "Goal amount is required"],
    min: [1, "Goal amount must be at least 1"],
  },
  currentAmount: {
    type: Number,
    default: 0,
    // required: [true, "Current amount is required"],
    // min: [0, "Current amount cannot be negative"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
    // required: [true, "User reference is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Post", postSchema);
