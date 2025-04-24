const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    fundraiserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donorName: {
      type: String,
      required: true,
      trim: true,
      default: "Anonymous",
    },
    donorEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [10, "Amount must be at least 10"],
    },
    currency: {
      type: String,
      default: "INR",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi", "netbanking", "wallet", "cash"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    gatewayResponse: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
