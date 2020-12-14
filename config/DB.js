const User = require("../models/user");
const passport = require("passport");
const emailValidator = require("email-validator");

exports.signIn = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.render("sign_in.ejs", {
        user: req.body.username,
        error: info.name.substring(0, info.name.length - 5),
        state: false,
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/file/gallery");
    });
  })(req, res, next);
};

//   sign up
exports.signUp = (req, res) => {
  let errors = [];
  let userData = {
    username: req.body.username,
    Fname: req.body.Fname,
    Lname: req.body.Lname,
    phone: req.body.phone,
    email: req.body.email,
  };

  if (
    !(
      userData.username &&
      userData.Fname &&
      userData.Lname &&
      userData.email &&
      userData.phone &&
      req.body.password
    )
  ) {
    errors.push({
      msg: "Please enter all fields",
    });
  } else if (!emailValidator.validate(userData.email)) {
    errors.push({
      msg: "Invalid email ",
    });
  } else if (req.body.password.length < 6) {
    errors.push({
      msg: "Password must be at least 6 characters",
    });
  }

  if (errors.length > 0) {
    res.render("sign_up.ejs", {
      error: errors[0]["msg"],
      returnData: userData,
    });
  } else {
    User.register(new User(userData), req.body.password, (error, user) => {
      if (error)
        res.render("sign_up.ejs", {
          error: error,
          returnData: userData,
        });
      passport.authenticate("local")(req, res, () => {
        res.redirect("/gallery");
      });
    });
  }
};

exports.signOut = (req, res) => {
  req.logOut();
  res.redirect("/");
};

exports.changePassword = (req, res) => {
  User.findOne({
    username: req.params.user,
  }).then((user) => {
    user.setPassword(req.body.newPassword, (err, user) => {
      if (err)
        res.status(200).json({
          message: err.message,
        });
      user.save();
      res.status(200).json({
        message: "successful",
      });
    });
  });
};
