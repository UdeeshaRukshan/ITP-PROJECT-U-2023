const router = require("express").Router();
let Property = require("../models/Property");

router.route("/add").post((req,res) =>{

    const address = req.body.address;
    const description = req.body.description;
    const value = req.body.value;
    const image = req.body.image;

    const newProperty = new Property({

        address,
        description,
        value,
        image,
    
    })

    newProperty.save().then(() => {
        res.json("Property Added")
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/").get((req,res) => {

    Property.find().then((properties) =>{
        res.json(properties)
    }).catch((err) =>{
        console.log(err) 

    })
           

})

router.route("/update/:auctioneerid").put(async (req,res) => {
    let userID = req.params.auctioneerid;
    const {firstName,lastName,email,contactNumber,address,street,city} = req.body;

    const updateAuctioneer = {
        firstName,
        lastName,
        email,
        contactNumber,
        address,
        street,
        city
    }

    const update = await Auctioneer.findByIdAndUpdate(userID, updateAuctioneer)
    .then(() =>{
        res.status(200).send({status: "User updated"})   
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })

})

router.route("/delete/:auctioneerid").delete(async (req,res) => {
    let userID = req.params.auctioneerid;

    await Auctioneer.findByIdAndDelete(userID)
    .then(() => {
        res.status(200).send({status: "User Deleted"});  
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error:err.message});
    })
})

router.route("/get/:auctioneerid").get(async(req,res) => {
    let userID = req.params.auctioneerid;
    await Auctioneer.findById(userID)
    .then((Auctioneer) => {
        res.status(200).send({status: "User fetched", Auctioneer})   
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error:err.message});

    })
})

module.exports = router;

