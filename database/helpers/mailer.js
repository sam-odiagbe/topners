const sgmail = require("@sendgrid/mail");
const randomString = require("crypto-random-string");
const Verification = require("../models/verificationModel");
const PasswordReset = require("../models/passwordResetModel");
sgmail.setApiKey(
  "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"
);

module.exports = data => {
  const { type, email, _id } = data;
  const token = randomString({ length: 20 });
  const from = { email: "app138750920@heroku.com", name: "no-reply@Topner" };
  const to = email;
  let url = "";
  let html = "";
  let subject = "";
  let message = "";
  switch (type) {
    case "VERIFICATION":
      url = `https://topner.herokuapp.com/verify_email/${email}/${token}`;
      subject = "Verify your Topner account";
      html = `
                <div style="padding: 1em; width: 300px;
                margin: 0 auto; background: #fff; box-shadow: 0 0 10px 1px rgba(0,0,0,0.2) ">
                    <h1 style="padding: .8em; padding-left: 0; color: dodgerblue;">Verify your email address</h1>
                    <p style="font-weight: bold; color: black;">Hi, to get the best out of topner we recommend you
                    verify your email address, click the botton below to verify now </p>
                    <a href=${url} style="text-decoration: none; background: #fff; color: #000; padding: 8px 1em; box-shadow: 0 0 10px 1px rgba(0,0,0,0.3); background: #44f6a1; color: #fff; font-weight: bold; border-radius: 20px;">Verify account</a>
                </div>
            `;
      break;
    case "PASSWORDRESET":
      url = `https://topner.herokuapp.com/password_reset/${email}/${token}`;
      subject = "Reset Your Password";
      html = `
                <div style="padding: 1em; width: 300px;
                margin: 0 auto; background: #fff; box-shadow: rgba(0,0,0,0.2) 0 0 10px 1px">
                    <h1 style="padding: .8em; padding-left:0; color: dodgerblue;">Reset your password</h1>
                    <p style="font-weight: bold;">Hi, you made a request to reset your password, please follow the link below to reset password, if you didnt make this request please ignore this mail </p>
                    <a href=${url} style="text-decoration: none; background: #fff; color: #000; padding: 8px 1em; box-shadow: 10px rgba(0,0,0,0.3;  background: #44f6a1; color: #fff; font-weight: bold;)">Reset your password</a>
                </div>
            `;
      break;
    default:
      break;
  }

  return sgmail
    .send({
      html,
      to,
      from,
      subject
    })
    .then(sent => {
      if (sent) {
        switch (type) {
          case "PASSWORDRESET":
            const reset = new PasswordReset({
              token,
              email
            });
            reset.save();
            message = `Reset link has been sent to ${email}`;
            break;
          case "VERIFICATION":
            const verify = new Verification({
              token,
              user: _id
            });
            verify.save();
            message = `Verification email has been sent to ${email}`;
            break;
          default:
            break;
        }
      }
    })
    .catch(err => console.log(err));
};

//generate random string and store in the database

// send the link to the user email
//
