const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    loggedUserEmail: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "your name is required"],
    },

    email: {
      type: String,
      required: [true, "your email is required"],
    },

    category: {
      type: String,
      required: [true, "category is required"],
    },
    subject: {
      type: String,
      required: [true, "your subject is required"],
    },
    ticketSolved: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: [true, "your message is required"],
    },
  },
  { timestamps: true }
);

const ticket = mongoose.model("Ticket", ticketSchema);
module.exports = ticket;
