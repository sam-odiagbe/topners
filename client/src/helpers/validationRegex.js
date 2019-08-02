export default {
  usernameRegex: /^[a-z0-9-_A-Z]{6,30}$/,
  accountNumberRegex: /^[0-9]{10}$/,
  nameRegex: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  emailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/,
  bankNames: [
    "Access Bank Plc",
    "Fidelity Bank Plc",
    "First City Monument Bank Plc (FCMB)",
    "First Bank of Nigeria Limited",
    "Guaranty Trust Bank Plc",
    "Union Bank of Nigeria Plc",
    "United Bank of Africa Plc (UBA)",
    "Zenith Bank Plc",
    "Ecobank Nigeria Plc",
    "Heritage Banking Company Limited",
    "Keystone Bank Limited",
    "Polaris Bank Limited",
    "Stanbic IBTC Bank Plc",
    "Standard Chartered",
    "Sterling Bank Plc",
    "Wema Bank Plc"
  ]
};
