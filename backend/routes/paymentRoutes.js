const router = require("express").Router();
const Payment = require("../models/Payment");

// data insert route
router.route("/addpayment").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address = req.body.address;
  const email = req.body.email;
  const phone = req.body.phone;
  const cardName = req.body.cardName;
  const cardNumber = req.body.cardNumber;
  const expiryDate = req.body.expiryDate;
  const cvv = req.body.cvv;

  const newPayment = new Payment({
    firstName,
    lastName,
    address,
    email,
    phone,
    cardName,
    cardNumber,
    expiryDate,
    cvv,
  });

  newPayment
    .save()
    .then(() => {
      res.json("Payment details Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

// data read route
router.route("/getpayments").get((req, res) => {
  Payment.find()
    .then((paymentRoutes) => {
      res.json(paymentRoutes);
    })
    .catch((err) => {
      console.log(err);
    });
});

// data update route
router.route("/updatepayment/:paymentid").put(async (req, res) => {
  let userId = req.params.paymentid;
  const {
    firstName,
    lastName,
    address,
    email,
    phone,
    cardName,
    cardNumber,
    expiryDate,
    cvv,
  } = req.body;

  const updatePayment = {
    firstName,
    lastName,
    address,
    email,
    phone,
    cardName,
    cardNumber,
    expiryDate,
    cvv,
  };

  const updatepayment = await Payment.findByIdAndUpdate(userId, updatePayment)
    .then(() => {
      res.status(200).send({ status: "Payment details updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

// data delete route
router.route("/deletepayment/:paymentid").delete(async (req, res) => {
  let userId = req.params.paymentid;

  await Payment.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "Payment details deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete details", error: err.message });
    });
});

// fetch data route
router.route("/getpayment/:paymentid").get(async (req, res) => {
  let userId = req.params.paymentid;
  await Payment.findById(userId)
    .then((Payment) => {
      res.status(200).send({ status: "Payment details fetched", Payment });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({
          status: "Error with getting Payment details",
          error: err.message,
        });
    });
});

module.exports = router;
