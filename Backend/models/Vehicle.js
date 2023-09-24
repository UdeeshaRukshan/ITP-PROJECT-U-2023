const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({

    vehicleNumber: {
        type : String,
        required: true //backend validation

    },
    year: {
        type : String,
        required: true
    },
    model: {
        type : String,
        required: true
    },
    fuelType: {
        type : String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    features: {
        type: String,
        required:true
    },
    location: {
        type: String,
        required:true
    },
    value: {
        type : Number,
        required: true
    },
    image: {
        type: String, // You can use String to store the file name or URL
        required: true
      }

})

const Vehicle = mongoose.model("Vehicle",vehicleSchema);

module.exports = Vehicle;

