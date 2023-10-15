const router = require("express").Router();
const mongoose = require("mongoose");
let AuctionHistory = require("../models/AuctionHistory");

router.route("/add").post((req,res)=>{

    const itemId = req.body.itemId;
    const bidValue = parseInt(req.body.bidValue,10);
    const userId = req.body.userId;

    const newAuction = new AuctionHistory({
        itemId,
        userId,
        bidValue,
    })

    newAuction.save().then(()=>{
        res.json("Bidd added to Bidd History Successfully")
    }).catch((err)=>{
        console.log(err);
    })

})
router.route("/").get((req,res)=>{
    AuctionHistory.find().then((auctions)=>{
        res.json(auctions)
    }).catch((err)=>{
        console.log(err)
    })
})
module.exports = router;