const nodemailer = require("nodemailer");
//      config sender
const transporter = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: "a7med3li2008@yahoo.com",
    pass: "swjyjtuhxgjtvqbe",
  },
});

let mailOptions = {
  from: "a7med3li2008@yahoo.com",
  to: "",
  subject: "Sending code to confirm change password :",
  text: "",
};

module.exports = { transporter, mailOptions };
