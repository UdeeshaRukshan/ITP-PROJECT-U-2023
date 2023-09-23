const router = require("express").Router();
let Art = require("../models/Art");

router.route("/add").post((req,res) =>{

    const title = req.body.title;
    const medium = req.body.medium;
    const height = req.body.height;
    const width = req.body.width;
    const condition = req.body.condition;
    const location = req.body.location;
    const value = req.body.value;
    const image = req.body.image;

    const newArt = new Art({

        title,
        medium,
        height,
        width,
        condition,
        location,
        value,
        image
    })

    newArt.save().then(() => {
        res.json("Art Added")
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/").get((req,res) => {

    Art.find().then((arts) =>{
        res.json(arts)
    }).catch((err) =>{
        console.log(err) 

    })
           

})

router.route("/update/:auctioneerid").put(async (req,res) => {
    let userID = req.params.auctioneerid;
    const {firstName,lastName,email,contactNumber,address,street,city} = req.body;

    const updateArt = {
        title,
        medium,
        height,
        width,
        condition,
        location,
        value,
        image
    }

    const update = await Art.findByIdAndUpdate(userID, updateArt)
    .then(() =>{
        res.status(200).send({status: "Art updated"})   
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating art", error: err.message});
    })

})

router.route("/delete/:auctioneerid").delete(async (req,res) => {
    let userID = req.params.auctioneerid;

    await Art.findByIdAndDelete(userID)
    .then(() => {
        res.status(200).send({status: "Art Deleted"});  
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete art", error:err.message});
    })
})

router.route("/get/:auctioneerid").get(async(req,res) => {
    let userID = req.params.auctioneerid;
    await Art.findById(userID)
    .then((Art) => {
        res.status(200).send({status: "Art fetched", Auctioneer})   
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get art", error:err.message});

    })
})

module.exports = router;

