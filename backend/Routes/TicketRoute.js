const router = require("express").Router();
const { ticketadd, getAllTicketsForAdmin } = require("../Controllers/TicketController");
const {
  getAllTickets,
  DeleteTicket,
  updateTicketStatus,
} = require("../Controllers/TicketController");
router.post("/add", ticketadd);
router.get("/getall", getAllTickets);
router.get('/getAll/admin',getAllTicketsForAdmin)
router.put("/update/:ticketId", updateTicketStatus);
module.exports = router;
