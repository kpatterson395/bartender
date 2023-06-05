import axios from "axios";
const token = process.env.API_TOKEN;
import formidable from "formidable";
import fs from "fs";

import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./public";
    // form.on("fileBegin", function (field, file) {
    //   console.log(file);
    //   fs.rename(file.path, form.uploadDir + "/" + file.name, (err) => {
    //     console.log(err);
    //   });
    // });
    form.on("fileBegin", (formname, file) => {
      console.log("file", file);
      fs.rename(file.filepath, form.uploadDir + "/liquors.jpg", (err) => {
        console.log(err);
      });
      form.emit("data", { name: "fileBegin", formname, value: file });
    });

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    });
  } catch (e) {
    console.error(e);
  }
};
