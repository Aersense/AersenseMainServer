const dotenv = require('dotenv');
dotenv.config({ path: "./env/secrets.env" });
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_KEY
    },
});

module.exports = transporter;