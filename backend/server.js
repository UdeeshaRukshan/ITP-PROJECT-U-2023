const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const ticketRoute = require("./Routes/TicketRoute");
const adminRoute = require("./Routes/AdminRoutes");
 const agentRouter = require("./Routes/agentroute");
 const propertie=require("./Routes/properties")
dotenv.config();

const { MONGO_URL } = process.env;
const PORT = 4043;

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
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    //optionsSuccessStatus: 200,
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(cookieParser());
app.use(express.json());

app.use("/", authRoute);
app.use("/ticket", ticketRoute);
app.use("/admin", adminRoute);
 app.use("/agent", agentRouter);
 app.use("/property",propertie)
