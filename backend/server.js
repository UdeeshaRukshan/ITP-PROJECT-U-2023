const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const itemRoutes = require('./routes/itemRoutes');
const wishlistRoutes = require('./routes/WishListRoutes');

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
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use('/api/items', itemRoutes);
app.use('/api/wishlist', wishlistRoutes);
