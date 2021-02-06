const mongoose = require("mongoose");
let gfs;

module.exports = async () => {
  await mongoose.connection.on("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });
  });

  return { gfs };
};
