const { check, validationResult } = require("express-validator");

//login validation
const doLoginValidators = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Mobile number or password is required"),
  check("password").isLength({ min: 1 }).withMessage("Password is required"),
];

//login validation handler
const doLoginValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
};

module.exports = {
  doLoginValidators,
  doLoginValidationHandler,
};
