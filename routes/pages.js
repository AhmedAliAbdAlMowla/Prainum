const { resolveInclude } = require("ejs");
const router = require("express").Router();
// const connectEnsureLogin = require("connect-ensure-login");
const { route } = require("./user");

const FileR = require("./files");
//      home Page
router.get("/", (req, res) => {
  res.render("home.ejs");
});
//      sign In Page
router.get("/signIn", (req, res) => {
  res.render("sign_in.ejs", { user: "", error: "", state: false });
});
//      sign In and resend confirm message Page
router.get("/signInr/:username", (req, res) => {
  res.render("sign_in.ejs", {
    user: req.params.username,
    error: "",
    state: true,
  });
});
//      sign Up Page
router.get("/signUp", (req, res) => {
  res.render("sign_up.ejs", { error: "", returnData: {} });
});


module.exports = router;