const Admin = require("../models/Admin");
const UserModel = require("../models/UserModel");
const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

//user authenticate
const authAdmin = asyncHandler(async (req, res) => {
  //getting body data
  const { userName, password } = req.body;

  console.log(userName, password);
  //check if user available in database
  const admin = await Admin.findOne({ userName });
  if (!userName) {
    return res.status(400).send({ message: "Invalid User Name" });
  }
  if (!(await admin.matchPassword(password)))
    return res.status(400).send({ message: "Incorrect Password " });

  //if user available send response with matching password and genarate JWT token using user id
  if (admin && (await admin.matchPassword(password))) {
    res.status(200).json({
      userName: admin.userName,
      id: admin._id,
    });
  } else {
    //send error message to frontend
    console.log("Invalid user name or Password");
    res.status(400).json({
      error: "Incorrect password !!!",
    });
    throw new error("Incorrect password !!!");
  }
});

const addAdmin = asyncHandler(async (req, res) => {
  //getting body data
  const { userName, password } = req.body;
  console.log(userName, password);

  //backend validation for body data
  if (!userName || !password) {
    res.send(400);
    throw new error("Please enter all the fields!!!");
  }

  //find if user exist with email and user name
  const adminExist = await Admin.findOne({ userName });

  //sending error message if user exist
  if (adminExist) {
    console.log("Admin already exist!!!");
    res.status(400).json({
      error: "Admin already exist !!!",
    });
    throw new error("Admin already exist!!!");
  }

  //create new user in database
  const admin = await Admin.create({
    userName,
    password,
  });

  //send response to frontend
  if (admin) {
    console.log("Registered!!!");
    res.status(201).json({
      _id: admin._id,
      userName: admin.userName,
      id: admin._id,
    });
  } else {
    //send error message to frontend
    console.log("Failed to Register Admin !!!");
    res.status(400).json({
      error: "Failed to Register Admin !!!",
    });
    throw new error("Failed to Register Admin !!!");
  }
});

const searchUser = asyncHandler(async (req, res) => {
  //getting keyword
  const keyword = req.query.search
    ? {
        $or: [
          { firstname: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          { lastname: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  //find user in databse by keyword
  const user = await UserModel.find(keyword);
  console.log(user);
  //send data to frontend
  if (user.length > 0) {
    res.status(200).send(user);
  } else {
    response = { message: "No matching result", status: false };
    res.status(404).send(response);
  }
});

const sendNotification = asyncHandler(async (req, res) => {
  const { image, description, selectedUser, selectedUserName } = req.body;

  if (!image || !selectedUser || !description || !selectedUserName) {
    console.log("All data not received");
    res.status(400);
    throw new error("Please fill all the fields!!!");
  }

  const notification = await Notification.create({
    image,
    description,
    selectedUser,
    selectedUserName,
  });

  if (notification) {
    res.status(200).json({ notification });
  } else {
    res.status(400);
    throw new error("Failed to send notification!!!");
  }
});

const updateNotification = asyncHandler(async (req, res) => {
  const { image, description, id } = req.body;

  if (!image || !description || !id) {
    res.status(400);
    throw new error("Invalid data passes into backend request!!!");
  } else {
    const updateNotification = await Notification.findByIdAndUpdate(
      id,
      {
        image: image,
        description: description,
      },
      {
        new: true,
      }
    );

    if (updateNotification) {
      res.status(200).json({
        updateNotification,
      });
    } else {
      res
        .status(400)
        .json({ message: "Notification not updated !!!", status: false });
    }
  }
});

const getAllNotifications = asyncHandler(async (req, res) => {
  const notification = await Notification.find();

  if (notification) {
    res.status(200).json({
      notification,
    });
  } else {
    res.status(401);
    throw new error("Error fetching articals");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body; // Assuming you have a route parameter for the user ID
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const getAllNotificationByUserId = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body; // Assuming you have a route parameter for the user ID
    const notification = await Notification.find({ selectedUser: userId });
    if (!notification) {
      return res.status(200).json({ message: "Notifications not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id);
  if (!id) {
    console.log("Invalid data passes into backend request");
    return res.sendStatus(400);
  } else {
    try {
      const notification = await Notification.findOneAndDelete({ _id: id });

      if (notification) {
        res.status(201).json({
          notificationId: id,
        });
      }
    } catch (error) {
      res.status(400);
      throw new error("Error while deleting package !!!" + error.message);
    }
  }
});

const sendEmail = asyncHandler(async (req, res) => {
  const { userEmail, subject, message } = req.body;

  console.log(userEmail, subject, message);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sdinuwan13@gmail.com",
      pass: "add your pass key here",
    },
  });

  var mailOptions = {
    from: "sdinuwan13@gmail.com",
    to: userEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).json({ message: "Failed to send email", status: false });
    } else {
      res.status(200).send(info);
    }
  });
});

module.exports = {
  authAdmin,
  addAdmin,
  sendNotification,
  getAllNotifications,
  searchUser,
  getUserById,
  updateNotification,
  deleteNotification,
  sendEmail,
  getAllNotificationByUserId,
};
