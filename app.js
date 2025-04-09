const express = require("express");
const fundRaiserRouter = require("./routes/fundRaiser");
const cors = require("cors");
const app = express();
require("./config/db");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/fundRaiser", fundRaiserRouter);
app.listen(4000, () => {
  console.log("Server is running on port 3000");
});
