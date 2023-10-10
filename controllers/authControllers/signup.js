const mongoose = require("mongoose");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");

const usernameRegex = /^[a-zA-Z0-9_-]+$/; // Alphanumeric with underscores and hyphens
const minUsernameLength = 4;
const maxUsernameLength = 20;


const signup = async (req, res) => {
  try {
    const { username,email, password, cpassword } = req.body;

    if (!username ||  !email || !password || !cpassword) {
      return res.status(400).json({
        success: false,
        message: "All Fields must be set",
      });
    }


    if (!username.match(usernameRegex)) {
        return res.status(400).json({ message: 'Username must only contain alphabets,underscore,hyphen and numbers.' });
      }
    
      if (username.length < minUsernameLength || username.length > maxUsernameLength) {
        return res.status(400).json({ message: `Username must be between ${minUsernameLength} and ${maxUsernameLength} characters.` });
      }
    

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    
  
    if (!validator.isLength(password, { min: 8 })) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long." });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain a mix of lowercase and uppercase letters, numbers, and special characters.",
      });
    }

    if (password !== cpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUser && !existingUsername) {
      return res.status(400).json({
        message: "User exists with the given email",
      });
    }
    else if (existingUsername && !existingUser) {
      return res.status(400).json({
        message: "Username taken",
      });
    }else if(existingUser && existingUsername){
        return res.status(400).json({
            message: "User already registered, Try Login",
          });
    }

    //secure password

    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        message: "Unknown Error Occurred,Try Again After Some Time",
      });
    }

    const image_url = `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;
    const newUser = await User.create({
      email,
      password: hashedPassword,
      image: image_url,
      username,
    });

    newUser.password = "";
    return res.status(200).json({
      message: "Sign Up Successful",
      user:{
      avatar:newUser.image,
      username:newUser.username,
      } ,
    });
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { signup };


