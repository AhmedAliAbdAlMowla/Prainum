"use strict";
if (process.env.NODE_ENV.trim() === "development") require("dotenv/config");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(methodOverride("_method"));
//  parser middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//  logger midleware
app.use(logger("dev"));

//  set static file handelar
app.use(express.static(__dirname + "/public"));
//  set view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// connect to mongodb
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Mongodb.."));

// init session

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 20,
    },
  })
);

// config passport
app.use(passport.initialize());
app.use(passport.session());

// config passport

const User = require("./models/user");
passport.use(
  new LocalStrategy(
    {
      // for login useing email or use npm -> passport-local-mongoose-email
      usernameField: "email",
    },
    User.authenticate()
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes

app.use("/", require("./routes/pages"));
app.use("/user", require("./routes/user"));
app.use("/file", require("./routes/files"));

// error : page not found 404
app.use((req, res, next) => {
  let err = new Error("page not found");
  err.status = 404;
  next(err);
});

// handling errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(PORT, (err) =>
  console.log(err ? err : `✌️ Server is up and running on port number  ${PORT}`)
);
