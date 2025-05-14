const nodemailer = require('nodemailer');

const sendEmail = async (companyName,to,subject,text)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.auth_user,
            pass: process.env.auth_pass
        }
    });

    const mailOptions = {
        from : `${companyName} <${process.env.auth_user}>`,
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;