const mongoose = require("mongoose");
const File = require("../models/file");
const s3Service = require("../services/s3");

/**
 * @desc    upload new file
 */
module.exports.create = async (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .json({ message: "You shoud send file in form-data." });

  const fileData = await s3Service.uploadFile(req.file);

  fileData.userId = mongoose.Types.ObjectId(req.user._id);

  const file = new File(fileData);
  await file.save();

  res.redirect("/file/gallery");
};
/**
 * @desc    Get all files
 */
module.exports.getAll = async (req, res, next) => {
  let files = await File.find({
    userId: mongoose.Types.ObjectId(req.user._id),
  }).select("-user_id -__v -s3_key");

  return res.render("gallery.ejs", {
    files,
    user: req.user._id,
  });
};

/**
 * @desc    Delete  file
 *
 */
module.exports.delete = async (req, res) => {
  const file = await File.findOne({
    _id: mongoose.Types.ObjectId(req.params.fileId),
  });

  if (!file)
    return res.status(400).json({
      message: "No valid entry found for provided ID",
    });

  //  delete file from server first
  await s3Service.deleteOne(file);

  // delete file from file map in db second
  await File.deleteOne({
    _id: mongoose.Types.ObjectId(req.params.fileId),
  });
  res.redirect("/file/gallery");
};
