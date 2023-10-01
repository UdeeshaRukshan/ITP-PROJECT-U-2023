const router = require("express").Router();
const { ticketadd } = require("../Controllers/TicketController");

router.post("/add", ticketadd);

module.exports = router;
