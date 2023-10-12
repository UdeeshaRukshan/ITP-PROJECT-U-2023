const router = require("express").Router();
 
const { ticketadd, getAllTickets } = require("../Controllers/TicketController");

router.post("/add", ticketadd);
router.get("/getall", getAllTickets)
module.exports = router;
