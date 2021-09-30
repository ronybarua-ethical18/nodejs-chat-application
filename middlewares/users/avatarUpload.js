const uploader = require("../../utilities/singleUploader");

const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatar",
    ["image/jpg", "image/jpeg", "image/png"],
    1000000,
    "Only .jpg, .jpeg and png format are allowd"
  );

  //call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            message: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avatarUpload;
