//external imports
const express = require("express");

//internal imports
const { getUsers, addUser, removeUser } = require("../controllers/usersController");
const decoratedHtmlResponse = require("../middlewares/common/decoratedHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidator,
  addUserValidationHandle,
} = require("../middlewares/users/userValidator");

const router = express.Router();
const {checkLogin} = require('../middlewares/common/checkLogin')
//users page
router.get("/", decoratedHtmlResponse("Users"), checkLogin, getUsers);

//add user
router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidator,
  addUserValidationHandle,
  addUser
);

//delete user
router.delete("/:id", removeUser)
module.exports = router;
