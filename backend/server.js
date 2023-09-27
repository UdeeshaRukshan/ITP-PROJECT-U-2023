const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const booksRoute = require("./routes/booksRoute"); // Import the route for books
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(cookieParser());

const { MONGO_URL, PORT } = process.env; // Correct the destructuring

const port = PORT || 4000; // Provide a default value for PORT

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

// Define routes
app.use("/books", booksRoute); // Use the books route for '/books' path

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome To MERN Stack Tutorial"); // Changed status code to 200
});
