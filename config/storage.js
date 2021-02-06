const GradFsStorage = require("multer-gridfs-storage");

const crypto = require("crypto");

const URI = require("../config/db").mongoURI;
module.exports = new GradFsStorage({
  url: URI,

  file: (req, file) => {
    return new Promise((resolve, rejects) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          rejects(err);
        }

        // const filename = buf.toString("hex") + path.extname(file.originalname); increpted

        const filename = file.originalname;
        const fileInfo = {
          filename: filename, // you shoud type filename  not fileName becouse this is error
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
