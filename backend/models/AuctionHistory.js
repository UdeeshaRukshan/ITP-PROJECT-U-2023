const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const auctionSchema = new Schema({
    itemId : {
        type : String,
        require : true
    },
    userId : {
        type : String,
        require : true
    },
    bidValue : {
        type : Number,
        require: true
    }
})

const Auction = mongoose.model("Auction_history",auctionSchema);

module.exports = Auction;