 const express = require("express");
 const mongoose = require("mongoose");
 const bodyParser = require("body-parser");
 const cors = require("cors");
 const dotenv = require("dotenv");
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
 connection.once("open", () =>{
    console.log("Mongodb connection succesful!");
     

 })

 const auctioneerRouter = require("./routes/auctioneers.js");
 const vehicleRouter = require("./routes/vehicles.js")

app.use("/auctioneer",auctioneerRouter)
app.use("/vehicle",vehicleRouter)

 app.listen(PORT,() => {
    console.log(`server is up and running on port ${PORT}`)
 })




