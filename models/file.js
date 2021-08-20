const mongoose = require("mongoose");
/**
 * @desc     File schema
 */
const fileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    index: true,
  },
  fileLink: {
    type: String,
    required: true,
  },
  s3_key: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },

  extension: {
    type: String,
    required: true,
  },
  share: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("File", fileSchema);
