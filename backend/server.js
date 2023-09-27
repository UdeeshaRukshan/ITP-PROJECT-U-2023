const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

//import route files
const personalDetailsRoutes = require("./routes/personalDetailsRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

//MongoDB connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

connection.once("open", () => {
  console.log("Mongodb Connection success!");
});

//Define routes
app.use("/payment", paymentRoutes);
app.use("/personalDetails", personalDetailsRoutes);

//start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
