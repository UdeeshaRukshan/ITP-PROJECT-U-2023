const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const forumRoute = require("./routes/forumRoute"); // Import the route for forums
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(cookieParser());

const { MONGO_URL, PORT } = process.env;

const port = PORT || 4042;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware for parsing request body
app.use(express.json());

// Define routes for forums
app.use("/forums", forumRoute); // Use the forum route for '/forums' path

app.get("/", (request, response) => {
  return response.status(200).send("Welcome To MERN Stack Tutorial");
});
