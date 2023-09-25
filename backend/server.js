const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

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

const wishlistRoutes = require('./routes/wishlistRoutes');
app.use('/api/wishlist', wishlistRoutes)

app.use(
  cors({
    // origin: ["http://localhost:3000"],
    // methods: ["GET", "POST", "PUT", "DELETE"],

    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],

    credentials: true,

    //optionsSuccessStatus: 200,
    // credentials: true,
  })
);

app.use(express.json());
