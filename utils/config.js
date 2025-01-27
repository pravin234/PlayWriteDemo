require("dotenv").config();

module.exports = {
  appUrl: process.env.APP_URL,
  credentials: {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
  defaultCountry: process.env.DEFAULT_COUNTRY,
};
