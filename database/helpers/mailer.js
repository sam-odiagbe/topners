const nodemailer = require("nodemailer");
const nodemailerMailgun = require("nodemailer-mailgun-transport");
const randomString = require("crypto-random-string");

// step 1 define auth
const auth = {
  auth: {
    api_key: "48adb20a13564874085693e6e0f16680-2b778fc3-a9e9d220",
    domain: "sandboxa09400a5aa5a40c299f80cdc3e21e809.mailgun.org"
  }
};

// step 2 transporter

// send mail

module.exports = ({ user, type, token }) => {
  return new Promise((resolve, reject) => {
    const { email, _id } = user;
    const from = "noreply@topners.com";
    const to = email;
    let subject, html, url;

    switch (type) {
      case "VERIFICATION":
        subject = "Verify your Topners account";
        url = `http://localhost:3000/email_verification/${_id}/${token}`;
        html = `<div style="text-align: center">
      <h1>Verify your Account</h1>
      <h3>Hi, this is samson from topners, to get the most out of our app, please verify your acccount by clicking the link below</h3>
      <a target="_black" href="${url}" style="text-decoration: none;padding: 15px; border: 0; border-radius: 20px; background: dodgerblue;color: white; font-weight: bold;">Verify your Account</a>
</div>`;
        break;
      case "PASSWORD-RESET":
        subject = "Reset your topners password";
        url = `http://localhost:3000/password_reset/${email}/${token}`;
        html = `<div style="text-align: center">
      <h1>Verify your Account</h1>
      <h3>Hi, this is samson from topners, to get the most out of our app, please verify your acccount by clicking the link below</h3>
      <a target="_black" href="${url}" style="text-decoration: none;padding: 15px; border: 0; border-radius: 20px; background: dodgerblue;color: white; font-weight: bold;">Verify your Account</a>
</div>`;
        break;
      default:
        break;
    }

    const mailOptions = {
      from,
      to,
      subject,
      html
    };
    let transporter = nodemailer.createTransport(nodemailerMailgun(auth));
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject({
          error: "Verification error",
          message: "Couldn't send email verification"
        });
      }
      resolve({ error: null, message: "Verification email sent successfully" });
    });
  });
};
