const User = require("../models/user");

let code = 0;

//  config nexmo api
const nexmo = require("../config/nexmo");

//   code generator
const code_Generator = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

//  send Code to phone
exports.sendSmsPhone = (req, res) => {
  code = code_Generator();
  //   ------------
  let to = "2";
  const from = "Pranium";
  const text = "the code to confirm is:" + code;
  let promise1 = new Promise((resolve, reject) => {
    User.find(
      {
        username: req.params.user,
      },
      (err, data) => {
        resolve(data[0].phone);
      }
    );
  });
  promise1
    .then((phone) => {
      try {
        to += phone;
        nexmo.message.sendSms(from, to, text);
        return true;
      } catch (err) {
        // console.log("Message not sent !!");

        res.render("sign_in.ejs", {
          user: "",
          error: "Message not sent !. becouse :" + err.message,
          state: false,
        });
      }
    })
    .then((value) => {
      if (value) {
        res.render("confirm.ejs", {
          user: req.params.user,
          state: "Message  send ✌️✌️.",
          confirm: true,
        });
      }
    });
};

//  send Code to  Email
exports.sendEmail = (req, res) => {
  code = code_Generator();
  //  config email
  const configEmail = require("../config/email");
  const transporter = configEmail.transporter;
  let mailOptions = configEmail.mailOptions;
  mailOptions.text = "code is : " + code;

  let promise1 = new Promise((resolve, reject) => {
    User.find(
      {
        username: req.params.user,
      },
      (err, data) => {
        resolve(data[0].email);
      }
    );
  });

  promise1.then((email) => {
    mailOptions.to = email;

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.render("sign_in.ejs", {
          user: "",
          error: "Email not send !. becouse :" + error.message,
          state: false,
        });
      } else {
        res.render("confirm.ejs", {
          user: req.params.user,
          state:
            "Email  send ✌️✌️.This may take some time. Wait for the mail to arrive",
          confirm: true,
        });
      }
    });
  });
};

// confirm code
exports.confirm = (req, res) => {
  if (req.body.code === code) {
    code = 0;
    res.render("changePassword.ejs", {
      user: req.params.user,
    });
  } else {
    res.render("confirm.ejs", {
      user: req.params.user,
      state: "code is error .. ",
      confirm: false,
    });
  }
};
