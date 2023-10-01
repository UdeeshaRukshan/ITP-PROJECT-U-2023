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


module.exports.updateTicketStatus = async(req,res) =>{
  try{
    const {ticketId} = req.params;

   const ticket=  await Ticket.findOneAndUpdate({_id:ticketId},{ticketSolved : true},{new:true});
  console.log(ticket);


   res.status(200).json(ticket);
  }catch(error){
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
}
