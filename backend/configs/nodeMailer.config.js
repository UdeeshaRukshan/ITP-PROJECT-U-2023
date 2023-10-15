const nodemailer = require('nodemailer');

module.exports.mailConfigs = () =>{
    return nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.CLIENT_EMAIL,
            pass : process.env.CLIENT_PASSWORD
        }
    });
}




