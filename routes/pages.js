const router = require("express").Router();

//      home Page
router.get("/", (req, res) => {
  res.render("home.ejs");
});

//      sign In Page
router.get("/signIn", (req, res) => {
  res.render("sign_in.ejs", { email: "", error: "", state: false });
});

//      sign Up Page
router.get("/signUp", (req, res) => {
  res.render("sign_up.ejs", { error: "", returnData: {} });
});

module.exports = router;
