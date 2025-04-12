const Post = require("../../models/Post");
const checkValid = require("../../utilities/checkPostBody");

exports.createFundPost = async (req, res) => {
  const isValid = checkValid(req.body);
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }
  try {
    const post = await Post.create({
      title: req.body.title,
      description: req.body.description,
      goal: req.body.goal,
      image: req.body.image,
      // userId: req.user._id,
      category: req.body.category,
      location: req.body.location,
      // user: req.user._id,
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
exports.getAllPosts = async (req, res) => {
  try {
    const filters = {};
    // let page = parseInt(req.query.page) || 1;
    // let limit = parseInt(req.query.limit) || 3;
    const { title, category, location, page, limit, } = req.query;
    if (title) {
      filters.title = { $regex: title, $options: "i" };
    }
    if (category) {
      filters.category = { $regex: category, $options: "i" };
    }
    if (location) {
      filters.location = { $regex: location, $options: "i" };
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    console.log("Filters:", filters);

    const posts = await Post.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);
    res.status(200).json({
      success: true,
      posts,
      message:
        posts.length > 0 ? "Posts fetched successfully" : "No posts found",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
