const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

const uploader = (
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) => {
  //make upload object
  const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}`;

  //define the storage
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, UPLOAD_FOLDER);
    },
    filename: (req, file, callback) => {
      //file.pdf = file-38743897.pdf

      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      callback(null, fileName + fileExt);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size, //10 MB
    },
    fileFilter: (req, file, callback) => {
      if (allowed_file_types.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(createError(error_msg));
      }
    },
  });

  return upload;
};

module.exports = uploader