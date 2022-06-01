const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // setup "config.env"
    // EMAIL_USERNAME=your-gmail
    // EMAIL_PASSWORD=your-password
    //
    // service: 'Gmail',
    // auth: {
    //   user: process.env.EMAIL_USERNAME,
    //   pass: process.env.EMAIL_PASSWORD
    // }
    // Activate in gmail "less secure app" option

    // setup "natours" at https://mailtrap.io/ and get SMTP information
    // setup "config.env"
    // EMAIL_USERNAME=20abf26fda09c0
    // EMAIL_PASSWORD=ae7d913c068a04
    // EMAIL_HOST=smtp.mailtrap.io
    // EMAIL_PORT=25 //  This is Error !!!!!!!!!!!!!!!!!!
    // EMAIL_PORT=2525 // check MAIL_PORT from "Laravel 7+"
    // MAIL_PORT=2525
    //
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Mikiyoshi Kokura <mikiyoshi.kokura@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
