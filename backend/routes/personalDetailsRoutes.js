const router = require("express").Router();
let PersonalDetails = require("../models/PersonalDetails");

// Data insert route
router.route("/add").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  const gender = req.body.gender;
  const email = req.body.email;
  const phone = req.body.phone;

  const newPersonalDetails = new PersonalDetails({
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    phone,
  });

  newPersonalDetails
    .save()
    .then(() => {
      res.json("Personal details Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//data read route
router.route("/").get((req, res) => {
  PersonalDetails.find()
    .then((personalDetailsRoutes) => {
      res.json(personalDetailsRoutes);
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
    dateOfBirth,
    gender,
    email,
    phone,
  } = req.body;

  const updatePersonalDetails = {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    phone,
  };

  const update = await PersonalDetails.findByIdAndUpdate(userId, updatePersonalDetails)
    .then(() => {
      res.status(200).send({ status: "Personal details updated" });
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

  await PersonalDetails.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "Personal details deleted" });
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
  const user = await PersonalDetails.findById(userId)
    .then((personalDetails) => {
      res.status(200).send({ status: "Personal details fetched", personalDetails });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({
          status: "Error with get Personal details",
          error: err.message,
        });
    });
});
module.exports = router;
