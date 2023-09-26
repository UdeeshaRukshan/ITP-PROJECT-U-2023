const router = require("express").Router();
const Payment = require("../models/Payment");

// data insert route
router.route("/add").post((req, res) => {
  const cardName = req.body.cardName;
  const cardNumber = req.body.cardNumber;
  const expiryDate = req.body.expiryDate;
  const cvv = req.body.cvv;

  const newPayment = new Payment({
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
router.route("/").get((req, res) => {
  Payment.find()
    .then((paymentRoutes) => {
      res.json(paymentRoutes);
    })
    .catch((err) => {
      console.log(err);
    });
});

// data update route
router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { cardName, cardNumber, expiryDate, cvv } = req.body;

  const updatePayment = {
    cardName,
    cardNumber,
    expiryDate,
    cvv,
  };

  const update = await Payment.findByIdAndUpdate(userId, updatePayment)
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
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

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
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  const user = await Payment.findById(userId)
    .then((payment) => {
      res.status(200).send({ status: "Payment details fetched", payment });
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
