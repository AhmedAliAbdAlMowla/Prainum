const User = require("../models/user");
const mongoose = require("mongoose");
const multer = require("multer");
const utf8 = require("utf8");

const URI = require("../config/db").mongoURI;
let gfs;

require("../config/gfs")().then((res) => {
  gfs = res.gfs;
});

const storage = require("../config/storage");

// Upload One  file to db
let fUpload = (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $push: {
        files: {
          _id: req.file.id,
          share: false,
        },
      },
    },
    {
      new: true,
    }
  ).then(() => {
    res.redirect("/file/gallery");
  });
};
// Get All  file from db
let fGetAll = (req, res) => {
  if (!gfs) {
    console.log("some error occured, check connection to db");
    return res.send("some error occured, check connection to db");
  }

  const doo = async () => {
    let allFile = [];

    let promise1 = new Promise((resolve, reject) => {
      User.find(
        {
          _id: req.user._id,
        },
        (err, data) => {
          resolve(data[0].files);
        }
      );
    });

    let files = await promise1;

    let promise2 = new Promise((resolve, reject) => {
      for (let i = 0; i < files.length; i++) {
        gfs
          .find({
            _id: files[i]._id,
          })
          .toArray((err, file) => {
            if (err) console.log(err);
            file[0].shareState = files[i].share;
            allFile.push(file[0]);

            if (i === files.length - 1) {
              resolve(allFile);
            }
          });
      }

      if (!files.length) {
        resolve(false);
      }
    });

    return (f1 = await promise2);
  };

  doo().then((files) => {
    if (!files || files.length === 0) {
      return res.render("gallery.ejs", {
        files: false,
        user: req.user._id,
      });
    } else {
      const Files = files
        .map((file) => {
          if (
            file.contentType === "image/png" ||
            file.contentType === "image/jpeg"
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
          return file;
        })
        .sort((a, b) => {
          return (
            new Date(b["uploadDate"]).getTime() -
            new Date(a["uploadDate"]).getTime()
          );
        });

      return res.render("gallery.ejs", {
        files: Files,
        user: req.user._id,
      });
    }
  });
};

// Get One  file from db
let fGetOne = (req, res) => {
  gfs
    .find({
      _id: mongoose.Types.ObjectId(req.params.fileId),
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }

      gfs.openDownloadStreamByName(files[0].filename).pipe(res);
    });
};

// Delete file from db
let fDelete = (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $pull: {
        files: {
          _id: req.params.id,
        },
      },
    },
    (err, data) => {
      if (err) {
        return res.json({
          error: "error in deleting files",
        });
      }
    }
  );

  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err)
      return res.status(404).json({
        err: err.message,
      });
    res.redirect("/file/gallery");
  });
};

// Download file from db
let fDownload = (req, res) => {
  gfs.find(new mongoose.Types.ObjectId(req.params.id)).toArray((err, file) => {
    // Check if file
    if (!file || file[0].length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    res.set({
      "Content-Disposition":
        "attachment; filename=" + utf8.encode(file[0].filename),
    });
    gfs.openDownloadStreamByName(file[0].filename).pipe(res);
  });
};

// Share file
let fShare = (req, res) => {
  let promise1 = new Promise((resolve, reject) => {
    User.find(
      {
        _id: req.params.userId,
      },
      (err, data) => {
        if (err) {
          reject(new Error("User not found"));
        } else {
          resolve(data[0].files);
        }
      }
    );
  });
  promise1
    .then((file) => {
      return (obj = file.find((Obj, i) => {
        if (Obj._id == req.params.fileId) {
          return file[i];
        }
      }));
    })
    .then((obj) => {
      if (obj) {
        if (obj.share) {
          return obj._id;
        } else return false;
      } else throw new Error("File not find");
    })
    .then((file) => {
      if (file) {
        req.params.id = file;
        fDownload(req, res);
      } else
        throw new Error("The owner of the file has closed this file share ..");
    })
    .catch((err) =>
      res.send({
        state: err.message,
      })
    );
};

//   setShareState
let setShareState = (req, res) => {
  let promise1 = new Promise((resolve, reject) => {
    User.updateOne(
      {
        _id: req.user._id,
        "files._id": req.body.fileId,
      },
      {
        $set: {
          "files.$.share": req.body.state,
        },
      }
    ).then((data, err) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  promise1
    .then((d) => res.send(d))
    .catch((err) =>
      res.send({
        state: err.message,
      })
     
    );
   
};

module.exports = {
  multerUploader: multer({
    storage,
  }),
  fUpload,
  fGetAll,
  fGetOne,
  fDelete,
  fDownload,
  fShare,
  setShareState,
};
