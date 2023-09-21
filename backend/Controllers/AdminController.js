const Admin = require("../models/Admin");
const User = require("../models/UserModel")
const Notification = require("../models/Notification")
const asyncHandler = require('express-async-handler');


//user authenticate
const authAdmin = asyncHandler(async (req, res) => {
  
    //getting body data
    const { userName, password } = req.body;
  
    console.log(userName,password);
    //check if user available in database
    const admin = await Admin.findOne({ userName });
    if(!userName){
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
    }
    else {
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
    const { userName, password} = req.body;
    console.log(userName,password);
  
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
        { username: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
        ],
    }
    : {};

//find user in databse by keyword
const user = await User.find(keyword);
console.log(user);
//send data to frontend
if(user.length>0){
    res.status(200).send(user);
}
else{
    response={message:"No matching result",status:false}
    res.status(404).send(response)
}
});

const sendNotification = asyncHandler(async(req,res)=>{


  const{image,description,selectedUser}=req.body;


if(!image || !selectedUser || !description){

    console.log("All data not received");
    res.status(400);
    throw new error("Please fill all the fields!!!");

}

    const notification = await Notification.create({
        image,description,selectedUser
    });

    if(notification){
        res.status(200).json({notification});
    }
    else{
        res.status(400);
        throw new error("Failed to send notification!!!");
    }

});

const getAllNotifications = asyncHandler(async(req,res)=>{

  const notification = await Notification.find();
    
        if(notification){
            res.status(200).json({
                notification
            });
        }else{
            res.status(401);
            throw new error("Error fetching articals");
        }
});


module.exports = {authAdmin,addAdmin,sendNotification,getAllNotifications,searchUser}