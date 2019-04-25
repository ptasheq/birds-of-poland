const Sealious = require("sealious");
const locreq = require("locreq")(__dirname);

const config = locreq("config.js");
const manifest = locreq("manifest.js");

const App = new Sealious.App(config, manifest);

require("../../custom-routes")(App);

const dependencies = ["collections/users.js"];

dependencies.forEach(dependency => require(`./${dependency}`)(App));

module.exports = {
  start: () => App.start(),
  _app: App
};
