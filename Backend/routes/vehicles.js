const router = require("express").Router();
let Vehicle = require("../models/Vehicle");

router.route("/addvehicle").post((req,res) =>{

    const vehicleNumber = req.body.vehicleNumber;
    const year = req.body.year;
    const model = req.body.model;
    const fuelType = req.body.fuelType;
    const mileage = req.body.mileage;
    const features = req.body.features;
    const location = req.body.location;

    const newVehicle = new Vehicle({

        vehicleNumber,
        year,
        model,
        fuelType,
        mileage,
        features,
        location
    })

    newVehicle.save().then(() => {
        res.json("Vehicle Added")
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/").get((req,res) => {

    Vehicle.find().then((vehicles) =>{
        res.json(vehicles)
    }).catch((err) =>{
        console.log(err) 

    })
           

})

router.route("/updatevehicle/:vehicleid").put(async (req,res) => {
    let userID = req.params.vehicleid;
    const {vehicleNumber,year,model,fuelType,mileage,features,location} = req.body;

    const vehicleupdate = {
        vehicleNumber,
        year,
        model,
        fuelType,
        mileage,
        features,
        location
    }

    const updatevehicle = await Vehicle.findByIdAndUpdate(userID, vehicleupdate)
    .then(() =>{
        res.status(200).send({status: "Vehicle updated"})   
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })

})

router.route("/deletevehicle/:vehicleid").delete(async (req,res) => {
    let userID = req.params.vehicleid;

    await Vehicle.findByIdAndDelete(userID)
    .then(() => {
        res.status(200).send({status: "Vehicle Deleted"});  
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete vehicle", error:err.message});
    })
})

router.route("/getvehicle/:vehicleid").get(async(req,res) => {
    let userID = req.params.vehicleid;
    await Vehicle.findById(userID)
    .then((Vehicle) => {
        res.status(200).send({status: "Vehicle fetched", Vehicle})   
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get vehicle", error:err.message});

    })
})

module.exports = router;

