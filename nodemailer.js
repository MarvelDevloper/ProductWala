const nodemailer = require('nodemailer')
require('dotenv').config()

const sendEmail = async ({ to, subject, text, html }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // your gmail
            pass: process.env.EMAIL_PASS  // app password
        }
    })

    const mailOptions = {
        from: `"ProductWala" ${process.env.EMAIL_USER}`,
        to,
        subject,
        text,
        html
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
