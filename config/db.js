const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://user:xfxgTbqfVhosiJOJ@fundraiser.85dwxf9.mongodb.net/?retryWrites=true&w=majority&appName=fundraiser",
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
