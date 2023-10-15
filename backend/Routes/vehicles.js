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
    const value = req.body.value;
    const image = req.body.image;
    const startTime = new Date(req.body.startTime);
    const endTime = new Date(req.body.endTime);
    
        const newVehicle = new Vehicle({
          vehicleNumber,
          year,
          model,
          fuelType,
          mileage,
          features,
          location,
          value,
          image,
          startTime,
          endTime
        })

        newVehicle.save().then(() => {
            res.json("Vehicle Added")
        }).catch((err) => {
            console.log(err);
        })
    
    })
    
        
router.route("/getvehicles").get((req,res) => {

    Vehicle.find().then((vehicles) =>{
        res.json(vehicles)
    }).catch((err) =>{
        console.log(err) 

    })
           

})

router.route("/updatevehicle/:vehicleid").put(async (req,res) => {
    let userID = req.params.vehicleid;
    const {vehicleNumber,year,model,fuelType,mileage,features,location,value,image} = req.body;

    const vehicleUpdate = {
        vehicleNumber,
        year,
        model,
        fuelType,
        mileage,
        features,
        location,
        value,
        image
    }

    const updatevehicle = await Vehicle.findByIdAndUpdate(userID, vehicleUpdate)
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

router.route("/addBid/:vehicleid/:currentBid/:bidder").get(async(req,res) => {
    let vehicleID = req.params.vehicleid;
    let value = req.params.currentBid
    let bidder = req.params.bidder
    await Vehicle.findByIdAndUpdate(vehicleID,
        {
            value:value,
            bidder:bidder
        })
    .then((Vehicle) => {
        res.status(200).send({status: "Bid added", Vehicle})   
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with adding bid", error:err.message});

    })
})

module.exports = router;

