const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({

    vehicleNumber: {
        type : String,
        required: true //backend validation

    },
    year: {
        type : Number,
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
    images: [
        {
            name: String,
            data: Buffer, // Store the image data as binary data
            contentType: {
                type: String,
                enum: ['image/jpeg', 'image/png'], // Allow only JPEG and PNG content types
            },
        },
    ],
    },// Store multiple image URLs or file names in an array
);

const Vehicle = mongoose.model("Vehicle",vehicleSchema);

module.exports = Vehicle;

