const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const User = require("../../models/People");
const { unlink } = require("fs");
//add user
const addUserValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already is use");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid bangladeshi mobile number")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile already is use");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 number, 1 uppercase, 1 lowercase and 1 symbol"
    ),
];

const addUserValidationHandle = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    //remove uploaded file
    if (req.files.length > 0) {
      const fileName = req.files[0];
      unlink(
        path.join(`${__dirname}/../public/uploads/avatar/${fileName}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    //response the error
    res.status(500).json({
        errors: mappedErrors
    })
  }
};

module.exports = {
  addUserValidator,
  addUserValidationHandle,
};
