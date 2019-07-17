const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

const msg = {
  to: "odiagbesamsonosaro@gmail.com",
  from: "app138750920@heroku.com",
  subject: "Verify your email address",
  text: "please verify your email address"
};

sgMail.send(msg, null, (err, result) => {
  if (err) {
    console.log(err.message);
  }

  console.log(result);
});
