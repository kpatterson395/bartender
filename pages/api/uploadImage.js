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

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  let response = {};

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not upload",
      });
    } else {
      cloudinary.uploader.upload(file.image.filepath).then((a) => {
        return res.status(200).json({ url: a.url });
      });
    }
  });
};
