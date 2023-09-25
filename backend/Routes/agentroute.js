const router = require("express").Router();
const Excel = require("excel4node");

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

router.get("/generate-report", async (req, res) => {
  try {
    // Fetch the list of agents from your database
    const agents = await agent.find({}, { _id: 0, __v: 0 });

    // Create a new Excel workbook and worksheet
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet("Agent Report");

    // Define column headers
    const headerStyle = wb.createStyle({
      font: {
        bold: true,
      },
    });

    ws.cell(1, 1).string("Name").style(headerStyle);
    ws.cell(1, 2).string("Age").style(headerStyle);
    ws.cell(1, 3).string("Address").style(headerStyle);
    ws.cell(1, 4).string("Job Type").style(headerStyle);

    // Populate the worksheet with agent data
    agents.forEach((agentss, index) => {
      ws.cell(index + 2, 1).string(agentss.name);
      ws.cell(index + 2, 2).string(agentss.age);
      ws.cell(index + 2, 3).string(agentss.address);
      ws.cell(index + 2, 4).string(agentss.jobtype);
    });

    // Generate the Excel file in memory
    const excelBuffer = await wb.writeToBuffer();

    // Set response headers for downloading
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=agent_report.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Send the Excel file as a response
    res.send(excelBuffer);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router; // Corrected the export statement
