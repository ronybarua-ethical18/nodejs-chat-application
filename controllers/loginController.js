const User = require("../models/People");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const createError = require("http-errors");

//get login page
const getLogin = (req, res, next) => {
  res.render("index");
};

//do login
const login = async (req, res, next) => {
  try {
    //find this user who has this emai/username
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(req.body.password, user.password);

      if (isValidPassword) {
        //prepare the user object to generate token
        const userObject = {
          username: user.name,
          email: user.email,
          mobile: user.mobile,
          role: "user",
        };

        //generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        //set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        //set logged in user local identifier
        res.locals.loggedInUser = userObject;

        res.render("inbox");
      } else {
        throw createError("Login failed! Please try again");
      }
    } else {
      throw createError("Login failed! Please try again");
    }
  } catch (error) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

//do logout
const logOut = (req, res) =>{
    res.clearCookie(process.env.COOKIE_NAME)
    res.send('logged out!')
}

module.exports = {
  getLogin,
  login,
  logOut
};
