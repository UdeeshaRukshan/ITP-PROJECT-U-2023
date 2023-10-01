const User = require("../models/UserModel");
const express = require("express");
const cookieParser = require("cookie-parser");
const { createSecretToken } = require("../Util/SecretToken");
const bcrypt = require("bcryptjs");
const app = express();
app.use(cookieParser());
module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, address, age, id, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({
      email,
      password,
      username,
      address,
      age,
      id,
      createdAt,
    });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    const username = email; // Replace with the actual username value
    res.cookie("username", username, {
      maxAge: 60000 * 60 * 24, // Cookie expiration time in milliseconds ( 1 Day)
      path: "/",
      withCredentials: true,
      httpOnly: false, // Make the cookie accessible only on the server-side
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.UserProfile = async (req, res) => {
  const userId = req.params.id;

  // Get the username from the cookie
  const usernameFromCookie = req.cookies.username;

  // if (!usernameFromCookie) {
  //   return res.status(401).json({ message: "User not authenticated" });
  // }

  const decodedEmail = decodeURIComponent(usernameFromCookie);

  // Use the username to find the user
  User.findOne({ email: decodedEmail })
    .then((user) => {
      if (!user) {
        // Handle the case where the user is not found
        return res.status(404).json({ message: "User not found" });
      }

      // Return the user's profile
      return res.json(user);
    })
    .catch((error) => {
      // Handle any errors that occur during the database query
      console.error(error);
      return res.status(500).json({ message: "Error fetching user profile" });
    });
};

module.exports.UpdateUser = async (req, res, next) => {
  try {
    const userId = req.params.id; // Assuming you have a route parameter for the user ID
    const { email, password, username, address, age } = req.body; // Assuming you send the updates in the request body
    const updates = {
      email,
      password,
      username,
      address,
      age,
    };

    // Update user details using Mongoose's findByIdAndUpdate
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.DeleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id; // Assuming you have a route parameter for the user ID
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
