const key = require("../../config").PAYSTACK_KEY;

const paystack = require("paystack")(key);

module.exports = ref => {
  paystack.transaction.verify(ref, (err, body) => {
    console.log(err);
    console.log(body);
  });
};
