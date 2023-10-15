const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
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
    message: {
      type: String,
      required: [true, "your message is required"],
    },
    ticketSolved: {
      type: Boolean,
      required: false
    },
    response: {
      type: String,
      default: ""
    },
  },
  { timestamps: true }
);

const ticket = mongoose.model("Ticket", ticketSchema);
module.exports = ticket;
