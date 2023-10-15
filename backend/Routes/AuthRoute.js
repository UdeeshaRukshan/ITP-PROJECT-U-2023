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
      // inform randi
      if (user) return res.json({ status: true, user: user.email });
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

router.put("/update-password/:id", async (req, res) => {
  const userId = req.params.id; // Assuming you have a route parameter for the user ID
  const { currentPassword, newPassword } = req.body;

  try {
    // Retrieve the user from the database
    const user = await User.findById(userId);

    // Check if the provided current password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      // Current password is incorrect
      return res.status(401).json({ message: "Invalid current password." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    // Password changed successfully
    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    // Handle errors (e.g., database error)
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
