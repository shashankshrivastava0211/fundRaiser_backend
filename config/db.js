const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/fundRaiser",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDb()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
