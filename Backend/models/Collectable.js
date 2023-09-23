const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collectableSchema = new Schema({

    type: {
        type : String,
        required: true //backend validation

    },
    name: {
        type : String,
        required: true
    },
    value: {
        type : String,
        required: true
    },
    desription: {
        type : String,
        required: true
    },
    image: {
        type: String, // You can use String to store the file name or URL
        required: true,
      }
    

})

const Collectable = mongoose.model("Collectable",collectableSchema);

module.exports = Collectable;

