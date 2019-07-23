const key = require("../../config").PAYSTACK_KEY;

const paystack = require("paystack")(key);

module.exports = ref => {
  return paystack.transaction.verify(ref);
};
