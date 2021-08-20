"use strict"
const s3Client = require("../config/s3");
const { v4 } = require("uuid");

async function deleteFromS3(params) {
  return s3Client.deleteObjects(params).promise();
}

async function deleteOneFromS3(params) {
  return s3Client.deleteObject(params).promise();
}

async function uploadFile(params) {
  return s3Client.upload(params).promise();
}

/**
 * @desc      Uplade file to aws s3 bucket
 * @param     file from multer
 * @returns   { file uploaded mete data }
 */
module.exports.uploadFile = async (file) => {
  const myFile = file.originalname.split(".");
  const extension = myFile[myFile.length - 1];
  const originalName = myFile[0];

  //  upload file to aws S3 params
  const uploadParams = {
    Bucket: process.env.BUCKET,
    Key: `${v4()}.${extension}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  const result = await uploadFile(uploadParams);
  return {
    fileLink: result.Location,
    s3_key: result.Key,
    originalName,
    extension: extension.toLowerCase(),
  };
   
};

/**
 * @desc      Delete one file from aws s3 bucket
 * @param     file => { s3_key}
 */

module.exports.deleteOne = async (file) => {
  let params = {
    Bucket: process.env.BUCKET,
    Key: file.s3_key,
  };

  await deleteOneFromS3(params);
};
/**
 * @desc      Delete many file from aws s3 bucket
 * @param     files => [{ s3_key}]
 */
module.exports.deleteManyFiles = async (files) => {
  let objects = [];
  for (let k in files) {
    objects.push({ Key: files[k].s3_key });
  }

  const options = {
    Bucket: process.env.BUCKET,
    Delete: {
      Objects: objects,
    },
  };

  await deleteFromS3(options);
};
