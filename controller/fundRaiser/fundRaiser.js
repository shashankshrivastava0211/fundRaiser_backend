const Post = require("../../models/Post");
const checkValid = require("../../utilities/checkPostBody");

exports.getAllPosts = async (req, res) => {
  try {
    //aggregate this for amunt
    const filters = {};
    // let page = parseInt(req.query.page) || 1;
    // let limit = parseInt(req.query.limit) || 3;
    const { title, category, location, page, limit } = req.query;
    if (title) {
      filters.title = { $regex: title, $options: "i" };
    }
    if (category) {
      filters.category = { $regex: category, $options: "i" };
    }
    if (location && location !== "All Locations") {
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

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post fetched successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
