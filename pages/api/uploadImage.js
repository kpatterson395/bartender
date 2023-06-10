import axios from "axios";
const token = process.env.API_TOKEN;
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

import formidable from "formidable";
import multer from "multer";
import fs from "fs";
import streamifier from "streamifier";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});
// const buffer = await uploadFileImage[0].arrayBuffer();
let cld_upload_stream = cloudinary.uploader.upload_stream(
  {
    folder: "uploads",
  },
  function (error, result) {
    return result;
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  try {
    const form = new formidable.IncomingForm();

    form.on("file", function (field, file) {
      let url = cloudinary.uploader
        .upload(file.filepath)
        .then((x) => {
          res.json({ url: x.url });
        })
        .catch((e) => console.log(e));
    });

    form.parse(req, (err, fields, file) => {
      if (err) {
        throw err;
      } else {
        console.log("success");
      }
    });
  } catch (e) {
    console.log(e);
  }
};
