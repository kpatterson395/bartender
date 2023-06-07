import axios from "axios";
const token = process.env.API_TOKEN;
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

import formidable from "formidable";
import multer from "multer";
import fs from "fs";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const cloudinaryUpload = (file) => cloudinary.uploader.upload(file);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./public";
    form.on("file", function (field, file) {
      //rename the incoming file to the file's name
      fs.rename(
        "./" + file.filepath,
        form.uploadDir + "/" + file.originalFilename,
        (err) => {
          if (err) throw err;
        }
      );
    });

    // form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
      if (err) {
        throw err;
      } else {
        console.log("success");
      }
    });
    cloudinaryUpload("./public/liquors.jpg")
      .then((x) => {
        res.json({ url: x.url });
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
