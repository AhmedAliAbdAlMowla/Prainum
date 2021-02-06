const { connect } = require("http2");
const mongoose = require("mongoose");
const URI = require("../config/db").mongoURI;

module.exports = () => {
  mongoose
    .connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,

      useFindAndModify: false,
    })
    .then(() => {
      console.log("DB Sucses Connect..");
    })
    .catch((error) => console.log(error));
};
