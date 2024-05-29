/*
 * Title: multer.middleware.js
 * Description : Multer middleware
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-29 11:30:19
 */

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

export default upload;
