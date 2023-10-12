const {
  Signup,
  Login,
  GetUser,
  UpdateUser,
  DeleteUser,
  UserProfile,
  UpdatePassword,
} = require("../Controllers/AuthController");
const router = require("express").Router();
const userVerification = require("../Middleware/AuthMiddleware");
const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const TOKEN_KEY = "jtx";

// Define the user verification middleware separately
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.firstname });
      else return res.json({ status: false });
    }
  });
};

// Apply the user verification middleware to specific routes
router.post("/", verifyUser);
router.post("/signup", Signup);
router.post("/login", Login);
router.get("/dashbord", UserProfile);
router.put("/update/:id", UpdateUser);
// router.put("/change-password/:id", UpdatePassword);
// router.put("/user/update/:id", UpdateUser);
router.delete("/delete/:id", DeleteUser);
module.exports = router;
