const Post = require("../../models/Post");

exports.createFundPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      description: req.body.description,
      goal: req.body.goal,
      image: req.body.image,
      userId: req.user._id,
      category: req.body.category,
      location: req.body.location,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
