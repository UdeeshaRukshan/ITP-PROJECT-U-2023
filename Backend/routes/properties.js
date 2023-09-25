const router = require("express").Router();
let Property = require("../models/Property");

router.route("/addproperty").post((req,res) =>{

    const address = req.body.address;
    const street = req.body.street;
    const city = req.body.city;
    const description = req.body.description;
    const value = req.body.value;
    const image = req.body.image;

    const newProperty = new Property({

        address,
        street,
        city,
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

router.route("/updateproperty/:propertyid").put(async (req,res) => {
    let userID = req.params.propertyid;
    const { address,street,city,description,value,image,} = req.body;

    const updateProperty = {
        address,
        street,
        city,
        description,
        value,
        image,
    }

    const update = await Property.findByIdAndUpdate(userID, updateProperty)
    .then(() =>{
        res.status(200).send({status: "Property updated"})   
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating property", error: err.message});
    })

})

router.route("/deleteproperty/:propertyid").delete(async (req,res) => {
    let userID = req.params.propertyid;

    await Property.findByIdAndDelete(userID)
    .then(() => {
        res.status(200).send({status: "Property Deleted"});  
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete property", error:err.message});
    })
})

router.route("/getproperty/:propertyid").get(async(req,res) => {
    let userID = req.params.propertyid;
    await Property.findById(userID)
    .then((Property) => {
        res.status(200).send({status: "Property fetched", Property})   
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get property", error:err.message});

    })
})

module.exports = router;

