const router = require("express").Router();
const connectEnsureLogin = require("connect-ensure-login");

const filesController = require("../controllers/files");

// Upload One  file to db
router.post(
  "/upload",
  filesController.multerUploader.single("file"),
  filesController.fUpload
);

// Get All  file from db
router.get(
  "/gallery",connectEnsureLogin.ensureLoggedIn("../signIn"),
  
  filesController.fGetAll
);

// Get One  file from db
router.get("/:fileId", filesController.fGetOne);

// Delete file from db
router.post("/del/:id", filesController.fDelete);

// Download file from db
router.get("/dow/:id", filesController.fDownload);

// Share file
router.get("/share/:userId/:fileId", filesController.fShare);
// set file share state
router.post(
  "/setShareState",
  connectEnsureLogin.ensureLoggedIn("/signIn"),
  filesController.setShareState
);

module.exports = router;
