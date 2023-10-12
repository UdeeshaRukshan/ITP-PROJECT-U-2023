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
