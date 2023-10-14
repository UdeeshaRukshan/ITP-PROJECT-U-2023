const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const ticketRoute = require("./Routes/TicketRoute");
const image = require("./models/image");
const auctioneerRouter = require("./Routes/auctioneers");
const vehicleRouter = require("./Routes/vehicles.js");
const artRouter = require("./Routes/arts.js");
const adminRoute = require("./Routes/AdminRoutes");
const propertyRouter = require("./Routes/properties");
const collectableRouter = require("./Routes/collectables");
const paymentRoute = require("./routes/paymentRoutes");
const wishlistRoutes = require("./Routes/WishlistRoutes");
const feedbackRoute = require("./Routes/FeedbackRoute");
const agentRouter = require("./Routes/agentroute");
const forumRoute = require("./Routes/forumRoute");

const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
dotenv.config();

app.use(cookieParser());

const { MONGO_URL } = process.env;
const PORT = 4042;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    // methods: ["GET", "POST", "PUT", "DELETE"],

    // origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],

    credentials: true,
  })
);

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "profile",
  });
  return res;
}

app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);

    const usernameFromCookie = req.cookies.username;
    const decodedEmail = decodeURIComponent(usernameFromCookie);
    const newData = new image({
      url: cldRes.secure_url,
      useremail: decodedEmail,
      // Assign other fields as needed
    });
    await newData.save();

    const response = {
      cloudinaryResponse: cldRes,
      message: "Image URL saved to the database",
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error uploading image", error: error.message });
  }
});

app.get("/image", async (req, res) => {
  try {
    const data = await image.find({}, "url");
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving image URLs", error: error.message });
  }
});
app.put("/update-password/:id", async (req, res) => {
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
app.use(express.json());

app.use("/", authRoute);
app.use("/ticket", ticketRoute);
app.use("/api", wishlistRoutes);
app.use("/auctioneer", auctioneerRouter);
app.use("/vehicle", vehicleRouter);
app.use("/art", artRouter);
app.use("/property", propertyRouter);
app.use("/collectable", collectableRouter);
app.use("/admin", adminRoute);
app.use("/payment", paymentRoute);
app.use("/agent", agentRouter);
app.use("/forums", forumRoute);
app.use("/api/feedback", feedbackRoute);
