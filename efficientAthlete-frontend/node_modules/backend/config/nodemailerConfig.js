const nodemailer = require("nodemailer");
require('dotenv').config();

const appEmail = process.env.APP_EMAIL;
const password = process.env.PASSWORD;


const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: appEmail,
    pass: password,
  },
});


module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {

  console.log("Check");

  transport.sendMail({
    from: appEmail,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8000/api/auth/confirm/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};

module.exports.sendResetPassworEmail = (firstName ,email, resetCode) => {
  console.log("ready to send email : "+ resetCode);

  transport.sendMail({
    from: appEmail,
    to: email,
    subject: "RESET PASSWORD",
    html: `<h1>Reset Password Email</h1>
        <h2>Hello ${firstName}</h2>
        <p> Please click on the following link to reset your password</p>
        <a href=http://localhost:3000/resetPassword/${resetCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));

};