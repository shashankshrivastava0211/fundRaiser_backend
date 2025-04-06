const express = require("express");
const fundRaiserRouter = require("./routes/fundRaiser");
const app = express();
require("./config/db");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/fundRaiser", fundRaiserRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
