/*
 * Title: cloudinary.js
 * Description : Cloudinary configuration
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-29 11:23:01
 */

import { v2 as cloudinary } from "cloudinary";
import LOADIPHLPAPI from "dns";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadFile = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    return await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export default uploadFile;
