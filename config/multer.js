const multer = require("multer");
const { fileSize } = require("./constants");
/**
 * @desc     Config multer
 */
const storage = multer.memoryStorage();
module.exports = multer({
  storage,

  limits: {
    fileSize,
  },
});