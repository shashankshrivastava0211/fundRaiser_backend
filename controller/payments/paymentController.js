const Payment = require("../../models/Payment");
const Post = require("../../models/Post");

const mongoose = require("mongoose");

exports.createPayment = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      postId,
      fundraiserId,
      donorName,
      donorEmail,
      amount,
      currency = "INR",
      paymentMethod,
      transactionId,
      gatewayResponse = {},
    } = req.body;

    const post = await Post.findById(postId).session(session);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.completed) {
      throw new Error("Fundraising already completed");
    }

    const payment = await Payment.create(
      [
        {
          fundraiserId,
          postId,
          donorName,
          donorEmail,
          amount,
          currency,
          paymentMethod,
          transactionId,
          gatewayResponse,
        },
      ],
      { session }
    );

    let newGoal = post.goal - amount;
    let completed = false;

    if (newGoal <= 0) {
      newGoal = 0;
      completed = true;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { goal: newGoal, completed },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Payment created successfully",
      payment: payment[0],
      updatedPost,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Payment creation failed:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
