const express = require("express");
const fundRaiserRouter = require("./routes/fundRaiser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const connectPassport = require("./utilities/Provider");
const authRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");

const app = express();
require("./config/db");

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
      secure: false, // true in production
      httpOnly: true, // "none" in production
    },
  })
);

connectPassport();
app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // ✅ This is required for cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/fundRaiser", fundRaiserRouter);
app.use("/api/auth", authRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
