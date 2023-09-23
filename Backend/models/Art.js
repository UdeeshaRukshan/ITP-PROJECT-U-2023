const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artSchema = new Schema({

    title: {
        type : String,
        required: true //backend validation

    },
    medium: {
        type : String,
        required: true
    },
    height: {
        type : Number,
        required: true
    },
    width: {
        type : Number,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required:true
    },
    value: {
        type: Number,
        required:true
    },
    image: {
        type: String, // You can use String to store the file name or URL
        required: true
      }

})

const Art = mongoose.model("Art",artSchema);

module.exports = Art;

