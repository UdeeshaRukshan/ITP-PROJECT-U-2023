const router = require("express").Router();
let Property = require("../models/Property");
// propertyRoutes.js
const express = require("express");

const multer = require("multer");
const path = require("path");

// Define the storage location and file naming for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "/Users/udeesharukshan/Documents/MERN STACK 2022(GITHUB)/ITP-PROJECT-U-2023/frontend/src/components/images/"
    ); // Set the folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + extname); // Rename the file to include a timestamp
  },
});

const upload = multer({ storage: storage });

// Import your Property model here

// Handle image upload route
router.post("/addproperty", upload.array("images", 10), async (req, res) => {
  try {
    // Access the uploaded files using req.files
    const images = req.files.map((file) => {
      return {
        filename: file.filename,
        path: file.path,
      };
    });

    // Create a new Property object with the form data
    const newProperty = new Property({
      address: req.body.address,
      street: req.body.street,
      city: req.body.city,
      description: req.body.description,
      value: req.body.value,
      images: images, // Assign the array of images
    });

    // Save the property to the MongoDB database
    await newProperty.save();

    res.json({ message: "Property added successfully", property: newProperty });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding property", error: error.message });
  }
});

module.exports = router;

router.route("/addproperty").post((req, res) => {
  const address = req.body.address;
  const street = req.body.street;
  const city = req.body.city;
  const description = req.body.description;
  const value = req.body.value;
  const images = req.body.images;

  const newProperty = new Property({
    address,
    street,
    city,
    description,
    value,
    images,
  });

  newProperty
    .save()
    .then(() => {
      res.json("Property Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getproperties").get((req, res) => {
  Property.find()
    .then((properties) => {
      res.json(properties);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/updateproperty/:propertyId").put(async (req, res) => {
  let userID = req.params.propertyId;
  const { address, street, city, description, value, images } = req.body;

  const updateProperty = {
    address,
    street,
    city,
    description,
    value,
    images,
  };

  const update = await Property.findByIdAndUpdate(userID, updateProperty)
    .then(() => {
      res.status(200).send({ status: "Property updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating property", error: err.message });
    });
});

router.route("/deleteproperty/:propertyid").delete(async (req, res) => {
  let userID = req.params.propertyid;

  await Property.findByIdAndDelete(userID)
    .then(() => {
      res.status(200).send({ status: "Property Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete property", error: err.message });
    });
});

router.route("/getproperty/:propertyId").get(async (req, res) => {
  let propertyId = req.params.propertyId; // Corrected variable name
  await Property.findById(propertyId) // Corrected variable name
    .then((property) => {
      if (!property) {
        return res.status(404).send({ status: "Property not found" });
      }
      res.status(200).send({ status: "Property fetched", property }); // Corrected variable name
    })
    .catch((err) => {
      // Added the error parameter
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get property", error: err.message });
    });
});

module.exports = router;
