const User = require("../models/user");
const passport = require("passport");
const { loginValidator, signupValidator } = require("../utils/validator/user");

/**
 * @desc    sign in
 */
exports.signIn = (req, res, next) => {
  const { error } = loginValidator(req.body);

  if (error) {
    return res.render("sign_in.ejs", {
      email: req.body.email,
      error: error.details[0].message,
      state: false,
    });
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.render("sign_in.ejs", {
        email: req.body.email,
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

/**
 * @desc    sign up
 */
exports.signUp = (req, res) => {
  const { error } = signupValidator(req.body);

  if (error) {
    res.render("sign_up.ejs", {
      error: error.details[0].message,
      returnData: req.body,
    });
  } else {
    User.register(new User(req.body), req.body.password, (error, user) => {
      passport.authenticate("local")(req, res, () => {
          res.redirect("/file/gallery");
      });
    });
  }
};

/**
 * @desc    sign out
 */
exports.signOut = (req, res) => {
  req.logOut();
  res.redirect("/");
};
