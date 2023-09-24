const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propertySchema = new Schema({

    address: {
        type : String,
        required: true //backend validation

    },
    description: {
        type : String,
        required: true
    },
    value: {
        type : Number,
        required: true
    },
    images: [{ type: String }], // Store multiple image URLs or file names in an array
});

const Property = mongoose.model("Property",propertySchema);

module.exports = Property;

