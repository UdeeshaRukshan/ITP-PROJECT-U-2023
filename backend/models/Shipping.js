const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shippingSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  }
});

const Shipping = mongoose.model("Shipping", shippingSchema);

module.exports = Shipping;
