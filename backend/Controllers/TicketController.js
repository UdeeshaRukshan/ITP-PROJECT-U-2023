const Ticket = require("../models/TicketModel");

module.exports.ticketadd = async (req, res) => {
  try {
    const { name, email, category, subject, message } = req.body;

    const ticket = await Ticket.create({
      name,
      email,
      category,
      subject,
      message,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all submitted tickets from the database
module.exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete submited ticket
module.exports.DeleteTicket = async (req, res) => {
  try {
    const _id = req.params.id;
    const ticket = await Ticket.findByIdAndDelete(_id);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
