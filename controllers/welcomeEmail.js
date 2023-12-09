const dotenv = require('dotenv');
dotenv.config({ path: "./env/secrets.env" });
const transporter = require('./nodemailerInitializer');

async function sendWelcomeMail(customer) {
    let info = await transporter.sendMail({
        from: `"Manager of sales, Aersense" <${process.env.EMAIL_ID}>`,
        to: customer.emailId,
        subject: `Welcome to Aersense - Elevate Your Air Experience with IoT-Powered Solutions!`,
        html: `
                <div style="display: flex; justify-content: center;">
        <table style="max-width: 600px; background-color: rgb(219, 218, 218); margin: 0 auto;" width="100%"
            cellpadding="0" cellspacing="0">
            <tr>
                <td style="background-color: #00a3a8ae; text-align: center;">
                    <img style="max-width: 100%;" src="https://i.ibb.co/ZSnp5mK/Aersense-logo.png" alt="">
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; text-align: center; font-size: 24px; font-weight: bold; color: #01445f;">
                    Welcome to Aersense.</td>
            </tr>
            <tr>
                <td style="padding: 20px; text-align: justify; font-size: 16px; color: #365a5d;">
                    <h4>Hello dear ${customer.name},</h4>
                    <p>Greetings of the day,
                        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; You took your first step towards a healthy life by
                        joining with us. At Aersense, we understand the importance of breathing clean, fresh air for a
                        healthier and happier life.
                        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Our range of cutting-edge products is designed to elevate your
                        indoor air experience and empower you with real-time insights into your air quality. Whether
                        you're at home, in the office, or any other indoor space, Aersense is dedicated to ensuring that
                        the air you breathe is of the highest quality.
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; text-align: center;">
                    <a href=${process.env.SERVER_URL}
                        style="display: inline-block; background-color: #73bddd; color: #000000b7; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit
                        page</a>
                </td>
            </tr>
            <tr>
                <td
                    style="background-color: #36515d; text-align: center; padding: 6px; color: #ffffff; font-size: 14px;">
                    &copy; Aersense. All rights reserved.
                </td>
            </tr>
        </table>
    </div>
            `,
    });
    // console.log(info.messageId);
}

module.exports = sendWelcomeMail;