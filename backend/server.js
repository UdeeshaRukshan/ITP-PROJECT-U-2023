const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const ticketRoute = require("./Routes/TicketRoute");
const image = require("./models/image");
const agentRouter = require("./Routes/agentroute");
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

app.use("/", authRoute);
