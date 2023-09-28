const router = require("express").Router();
 
const { ticketadd, getAllTickets, DeleteTicket } = require("../Controllers/TicketController");

router.post("/add", ticketadd);
router.get("/getall", getAllTickets)
router.delete("/delete/:id", DeleteTicket)
module.exports = router;
