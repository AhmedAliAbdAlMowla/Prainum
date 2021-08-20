const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
  {

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(passportLocalMongoose, { usernameField : 'email' });
module.exports = mongoose.model("User", UserSchema);
