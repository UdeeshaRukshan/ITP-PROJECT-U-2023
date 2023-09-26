const mongoose = require('mongoose');   

const wishlistSchema = mongoose.Schema({
    titre : {type:String, required:true},
    description : {type:String,required:false},
    imageUrl : {type:String, required:false},
    prix : {type: Number, required:false},
    lienURL : {type:String, required:false}
})


module.exports = mongoose.model('Wishlist', wishlistSchema);