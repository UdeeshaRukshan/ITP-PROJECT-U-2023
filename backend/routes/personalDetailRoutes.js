const router = require("express").Router();
let PersonalDetail = require("../models/PersonalDetail");

// Data insert route
router.route("/addinfo").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  const gender = req.body.gender;
  const email = req.body.email;
  const phone = req.body.phone;

  const newPersonalDetail = new PersonalDetail({
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    phone
  });

  newPersonalDetail.save().then(() => {
      res.json("Personal details Added");
    }).catch((err) => {
      console.log(err);
    })
})

//data read route
router.route("/getusers").get((req, res) => {
  PersonalDetail.find().then((personalDetailRoutes) => {
      res.json(personalDetailRoutes);
    }).catch((err) => {
       console.log(err);
    })
})

//data update route
router.route("/updateinfo/:userid").put(async (req, res) => {
  let userId = req.params.userid;
  const {firstName, lastName, dateOfBirth, gender, email, phone,} = req.body;

  const updatePersonalDetail = {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    phone,
  };

  const updatePersonaldetail = await PersonalDetail.findByIdAndUpdate(userId, updatePersonalDetail)
    .then(() => {
      res.status(200).send({ status: "Personal details updated" });
    }).catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data", error: err.message });
    })
})

//data delete route
router.route("/deleteinfo/:userid").delete(async (req, res) => {
  let userId = req.params.userid;

  await PersonalDetail.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "Personal details deleted" });
    }).catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with delete details", error: err.message });
    })
})

//fetch data route
router.route("/getinfo/:userid").get(async (req, res) => {
  let userId = req.params.userid;
  await PersonalDetail.findById(userId)
    .then((PersonalDetail) => {
      res.status(200).send({ status: "Personal details fetched", PersonalDetail });
    }).catch((err) => {
      console.log(err.message);
      res.status(500).send({status: "Error with get Personal details", error: err.message});
    })
})
module.exports = router;
