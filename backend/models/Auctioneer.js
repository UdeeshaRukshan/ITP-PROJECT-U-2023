const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const auctioneerSchema = new Schema({

    firstName: {
        type : String,
        required: true //backend validation

    },
    lastName: {
        type : String,
        required: true
    },
    email: {
        type : String,
        required: true
    },
    contactNumber: {
        type : String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required:true
    },
    city: {
        type: String,
        required:true
    }

})

const Auctioneer = mongoose.model("Auctioneer",auctioneerSchema);

module.exports = Auctioneer;

