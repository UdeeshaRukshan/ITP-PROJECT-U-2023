var Mailgen = require('mailgen');
const dotenv = require('dotenv').config();
const mailConfig = require('../configs/nodeMailer.config');


module.exports.sendTicketSubmitMail = async (cusName, CusEmail) =>{

    console.log(cusName,CusEmail)

    //import mail configs
    let mailTransporter = mailConfig.mailConfigs();

    
    let MailGenerator = new Mailgen({
        theme: "cerberus",
        product : {
            name: "AuctionPal",
            link : 'http://localhost:3000/',
        }
    })
    
    var email = {
        body: {
            name: `${cusName}`,
            intro: `This is send because of Your submitted ticket`,
            action: {
                instructions: 'We will reply to you within a few days..',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Watch out..A reply will come at some point..Check it by clicking here',
                    link: 'http://localhost:3000/ticket/mytickets'
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
    
    //convert mailgen body into HTML
    let mail = MailGenerator.generate(email);
    
    //nodemailer sending credentials
    let details = {
        from : process.env.CLIENT_EMAIL,
        to : `${CusEmail}`,
        subject : `Ticket submitted`,
        html : mail
    }
    
    //send mail through nodemailer
    await mailTransporter.sendMail(details).then((data) =>{
        return data;
    }).catch((error) =>{
        return error;
    })
        
}

