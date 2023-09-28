const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  firstname: {
    type: String,
    required: [true, "Your firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "Your lastname is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  address: {
    type: String,
    required: [true, "Your address is required"],
  },
  age: {
    type: String,
    required: [true, "Your age is required"],
  },
  id: {
    type: String,
    required: [true, "Your ID is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
