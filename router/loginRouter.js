//external imports
const express = require("express");

//internal imports
const { getLogin, login, logOut } = require("../controllers/loginController");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");
const decoratedHtmlResponse = require("../middlewares/common/decoratedHtmlResponse");
const {
  doLoginValidators,
  doLoginValidationHandler
} = require("../middlewares/login/loginValidators");

const router = express.Router();

const page_title = "Login";
//login page
router.get("/", decoratedHtmlResponse(page_title), redirectLoggedIn, getLogin);

//process login
router.post(
  "/",
  decoratedHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

//logout
router.delete('/', logOut)

module.exports = router;
