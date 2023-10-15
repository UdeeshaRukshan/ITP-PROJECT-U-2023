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
router.route("/get/:userId").get(async (req,res)=>{
    let userId = req.params.userId;
    const bid = await AuctionHistory.find({userId : userId}).then((bidd)=>{
        res.status(200).send({status : "Bid fetched",bidd})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error: err.message})
    })
})
module.exports = router;