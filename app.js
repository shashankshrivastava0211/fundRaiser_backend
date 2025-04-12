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
      sameSite: "none",
      secure: false, // true in production
      httpOnly: false, // "none" in production
    },
  })
);

connectPassport();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/fundRaiser", fundRaiserRouter);
app.use("/api/auth", authRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
