const router = require("express").Router();
const { render } = require("ejs");
const forgot = require("../controllers/forgot");
//  send Code to phone
router.get("/phone/:user", forgot.sendSmsPhone);

//  send Code to  Email
router.get("/email/:user", forgot.sendEmail);

router.post("/confirm/:user", forgot.confirm);

module.exports = router;
