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
    image: {
        type: String, // You can use String to store the file name or URL
        required: true,
      }
    

})

const Property = mongoose.model("Property",propertySchema);

module.exports = Property;

