const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema({
  address: {
    type: String,
    required: true, //backend validation
  },
  street: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  images: [
    {
      filename: String,
      path: String,
    },
  ],
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
