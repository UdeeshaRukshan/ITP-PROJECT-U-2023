const router = require("express").Router();
const { ticketadd, getAllTickets, DeleteTicket, updateTicketStatus } = require("../Controllers/TicketController");

router.post("/add", ticketadd);
router.get("/getall", getAllTickets)
router.put("/update/:ticketId", updateTicketStatus)
module.exports = router;
