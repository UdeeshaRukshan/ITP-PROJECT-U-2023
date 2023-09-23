const router = require("express").Router();
let Auctioneer = require("../models/Auctioneer");

router.route("/add").post((req,res) =>{

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const contactNumber = req.body.contactNumber;
    const address = req.body.address;
    const street = req.body.street;
    const city = req.body.city;

    const newAuctioneer = new Auctioneer({

        firstName,
        lastName,
        email,
        contactNumber,
        address,
        street,
        city
    })

    newAuctioneer.save().then(() => {
        res.json("Auctioneer Added")
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/").get((req,res) => {

    Auctioneer.find().then((auctioneers) =>{
        res.json(auctioneers)
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

