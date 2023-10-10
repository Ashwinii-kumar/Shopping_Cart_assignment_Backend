const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      // console.error(error);
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // console.log(user);
    const payload = {
      id: user._id,
      username:user.username,
    };
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30m",
      });

      user.password = undefined;
      //set cookies options
      const options = {
        expiresIn: new Date(Date.now() * 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "LOgin Successful",
        user:{
        
            avatar:user.image,
            username:user.username
            } ,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password is wrong,Try Again",
      });
    }
  } catch (error) {
    // console.error(error);
    return res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { login };
