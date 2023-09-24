const router = require("express").Router();
let Collectable = require("../models/Collectable");

router.route("/addcollectable").post((req,res) =>{

    const type = req.body.type;
    const name = req.body.name;
    const value = req.body.value;
    const description = req.body.description;
    const image = req.body.image;

    const newCollectable = new Collectable({

        type,
        name,
        value,
        description,
        image
    })

    newCollectable.save().then(() => {
        res.json("Collectable Added")
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/").get((req,res) => {

    Collectable.find().then((collectables) =>{
        res.json(collectables)
    }).catch((err) =>{
        console.log(err) 

    })
           

})

router.route("/updatecollectable/:collectableid").put(async (req,res) => {
    let userID = req.params.collectableid;
    const {type,name,value,description,image}=req.body;
    const updateCollectable = {
        type,
        name,
        value,
        description,
        image
    }

    const updatecollectable = await Collectable.findByIdAndUpdate(userID, updateCollectable)
    .then(() =>{
        res.status(200).send({status: "Collectable updated"})   
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating collectable", error: err.message});
    })

})

router.route("/deletecollectable/:collectableid").delete(async (req,res) => {
    let userID = req.params.collectableid;

    await Collectable.findByIdAndDelete(userID)
    .then(() => {
        res.status(200).send({status: "Collectable Deleted"});  
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete collectable", error:err.message});
    })
})

router.route("/getcollectable/:collectableid").get(async(req,res) => {
    let userID = req.params.collectableid;
    await Collectable.findById(userID)
    .then((Collectable) => {
        res.status(200).send({status: "User fetched", Collectable})   
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error:err.message});

    })
})

module.exports = router;

