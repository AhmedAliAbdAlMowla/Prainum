const router = require("express").Router();
const userController = require("../controllers/user");

// sign in
router.post("/signIn", userController.signIn);

// sidn up
router.post("/signUp", userController.signUp);

//  logout
router.get("/signOut", userController.signOut);
// change password
router.post("/changePassword/:user", userController.changePassword);
module.exports = router;
