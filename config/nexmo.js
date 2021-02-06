const Nexmo = require("nexmo");
const apiKey = "2e59a33c";
const apiSecret = "jD9wlJRDPs4C8vCL";
//      Config nexmo api
module.exports = new Nexmo({
  apiKey: apiKey,
  apiSecret: apiSecret,
});
