const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  vehicleNumber: {
    type: String,
    required: true, //backend validation
  },
  year: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  features: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  bidder: {
    type: String,
    default: "no bidder",
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
