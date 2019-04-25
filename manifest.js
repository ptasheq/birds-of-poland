const locreq = require("locreq")(__dirname);

module.exports = {
  name: "birds-of-poland",
  logo: locreq.resolve("public/logo.png"),
  default_language: "pl",
  version: "0.0.0",
  base_url: "http://localhost:8080",
  colors: {
    primary: "#4d394b"
  },
  admin_email: "kontakt@sealcode.org"
};
