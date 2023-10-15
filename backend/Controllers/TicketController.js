const Ticket = require("../models/TicketModel");
const {sendTicketSubmitMail} = require("../Mails/tickets.mails")

//store values in database
module.exports.ticketadd = async (req, res) => {
  try {
    const { name, email, category, subject, message } = req.body;
if(!name || !email || !category|| !subject|| !message){
  throw new Error("All feilds are required")
}
    const {username} = req.cookies;

    const ticket = await Ticket.create({
      loggedUserEmail : username,
      name,
      email,
      category,
      subject,
      message,
    });

    sendTicketSubmitMail(ticket.name,ticket.email)

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all submitted tickets from the database
module.exports.getAllTickets = async (req, res) => {
  try {

    // get user identify cookie
    const {username} = req.cookies;
    
    console.log(req.cookies);

        // returns all ticket relevent to current logged-in user
    const tickets = await Ticket.find({loggedUserEmail: username});   
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
