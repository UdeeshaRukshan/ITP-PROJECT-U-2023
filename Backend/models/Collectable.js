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
        type : Number,
        required: true
    },
    description: {
        type : String,
        required: true
    },
    images: [{ type: String }], // Store multiple image URLs or file names in an array
});

const Collectable = mongoose.model("Collectable",collectableSchema);

module.exports = Collectable;

