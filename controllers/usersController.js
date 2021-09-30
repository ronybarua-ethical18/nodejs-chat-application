const bcrypt = require("bcrypt");
const User = require("../models/People")
const path = require('path')
//get users page
const getUsers = async (req, res, next) => {

  try {
    const users = await User.find()
    res.render("users", {
      users: users,
    });
  } catch (error) {
    next(error)
  }
};

const addUser = async (req, res, next) => {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  //save user or send error
  try {
    const result = await newUser.save();
    res.status(200).json({
      data: result,
      message: "User was successfully created",
    });
  } catch (error) {
    res.status(500).json({
      error: {
        common: {
          message: "unknown error occured",
        },
      },
    });
  }
};

const removeUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete({_id: req.params.id})
    if(user.avatar){
      unlink(
        path.join(`${__dirname}/../../public/uploads/avatar/${user.avatar}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    res.status(200).json({
      message: "User was removed successfully"
    })
  } catch (error) {
    res.status(500).json({
      error:{
        common:{
          msg: "Could not delete the user"
        }
      }
    })
  }
}

module.exports = {
  getUsers,
  addUser,
  removeUser
};
