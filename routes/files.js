const router = require("express").Router();
const connectEnsureLogin = require("connect-ensure-login");
const upload = require("../config/multer");
const fileController = require("../controllers/files");

router.get(
  "/gallery",
  connectEnsureLogin.ensureLoggedIn("../signIn"),
  fileController.getAll
);
// Upload file
router.post("/", upload.single("file"), fileController.create);

// Get All  
router.delete("/:fileId", fileController.delete);



module.exports = router;
