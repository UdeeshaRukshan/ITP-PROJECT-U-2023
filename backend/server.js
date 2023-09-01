// backend/server.mjs
const mongoose = require("mongoose");
// Rest of your code...
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express"); //import express from "express";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5001;
// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err.message);
  });

//user schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  address: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/sign", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, address, password } =
      req.body;

    // Check if the password and confirmPassword match before proceeding
    // if (password !== req.body.confirmPassword) {
    //   return res.status(400).json({ error: "Passwords do not match" });
    // }

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      password,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      // User found, send a success response
      res.status(200).json({ message: "Login successful" });
      console.log("Done login");
    } else {
      // User not found or password mismatch, send an error response
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
