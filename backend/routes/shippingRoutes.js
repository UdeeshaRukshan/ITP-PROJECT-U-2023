const router = require("express").Router();
let Shipping = require("../models/Shipping");

// Data insert route
router.route("/add").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const addressLine1 = req.body.addressLine1;
  const addressLine2 = req.body.addressLine2;
  const city = req.body.city;
  const province = req.body.province;
  const postalCode = req.body.postalCode;

  const newShipping = new Shipping({
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    city,
    province,
    postalCode,
  });

  newShipping
    .save()
    .then(() => {
      res.json("Shipping details Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//data read route
router.route("/").get((req, res) => {
  Shipping.find()
    .then((shippingRoutes) => {
      res.json(shippingRoutes);
    })
    .catch((err) => {
      console.log(err);
    });
});

//data update route
router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const {
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    city,
    province,
    postalCode,
  } = req.body;

  const updateShipping = {
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    city,
    province,
    postalCode,
  };

  const update = await Shipping.findByIdAndUpdate(userId, updateShipping)
    .then(() => {
      res.status(200).send({ status: "Shipping details updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//data delete route
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Shipping.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "Shipping details deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete details", error: err.message });
    });
});

//fetch data route
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  const user = await Shipping.findById(userId)
    .then((shipping) => {
      res.status(200).send({ status: "Shipping details fetched", shipping });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({
          status: "Error with get shipping details",
          error: err.message,
        });
    });
});
module.exports = router;
