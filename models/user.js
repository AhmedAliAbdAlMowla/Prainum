const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  Fname: {
    type: String,
    required: true,
  },
  Lname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Dcreate: {
    type: Date,
    default: Date.now(),
  },
  files: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fileId",
      },
      share: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
