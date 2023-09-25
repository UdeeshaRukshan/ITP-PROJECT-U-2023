const router = require("express").Router();

let agent = require("../models/agent");

router.route("/add").post((req, res) => {
  const { name, address, age, jobtype } = req.body;
  const newAgent = new agent({
    name,
    age,
    address,
    jobtype,
  });

  newAgent
    .save()
    .then(() => {
      res.json("Agent added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/agents").get((req, res) => {
  agent
    .find()
    .then((agents) => {
      res.json(agents);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let agentId = req.params.id;

  const { name, address, age, jobtype } = req.body;

  const updateAgent = {
    name,
    age,
    address,
    jobtype,
  };
  const update = await agent
    .findByIdAndUpdate(agentId, updateAgent)
    .then(() => {
      res.status(200).send({ status: "User updated!" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let agentId = req.params.id;
  const del = await agent.findByIdAndDelete(agentId).then(() => {
    res.status(200).send({ status: "User deleted!" });
  });
});

router.route("/get/:id").get(async (req, res) => {
  let agentId = req.params.id;

  const agentData = await agent.findById(agentId).then((agent) => {
    res.status(200).send({ status: "User fetch!", agent: agent });
  });
});

module.exports = router; // Corrected the export statement
