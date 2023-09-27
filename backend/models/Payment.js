const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  email: {
    type: String,

    unique: true,
  },
  phone: {
    type: String,
  },
  cardName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
  },
  expiryDate: {
    type: String,
  },
  cvv: {
    type: String,
  },
});

const Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;
