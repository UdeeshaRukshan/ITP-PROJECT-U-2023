const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Mongodb Connection success!");
})


const studentRouter = require("./routes/students.js"); //according to the files we created

//http://Localhost:8070/student

app.use("/student",studentRouter); //according to the files we created

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`)
})


