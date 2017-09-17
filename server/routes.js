var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
var pick = require("lodash.pick");

var launchRoutes = function(server, app) {
  server.listen(port, function() {
    console.log("Server is listening on port " + port);
  });
  app.use(cors());
  app.use(bodyParser.json({
    limit: "100mb"
  }));
  app.use(bodyParser.urlencoded({
    limit: "100mb",
    extended: true
  }));
  // to serve the pages.
  app.use("/", express.static("../dist/"));
  app.use("/about", express.static("../dist/"));
  app.use("/constitution", express.static("../dist/"));
  app.use("/learn", express.static("../dist/"));
  app.use("/thankyou", express.static("../dist/"));
  app.use("/subscribe", express.static("../dist/"));
  app.use("/parties", express.static("../dist/"));
  app.use("/pdf", express.static("../src/pdf"));
  app.use("/land", express.static("../dist/"));
  app.use("/is", express.static("../dist/"));
  app.use("/en", express.static("../dist/"));
  app.use("/favicon.ico", express.static("../src/img/favicon.ico"));
  app.use("/img", express.static("../src/img"));
};

module.exports = {
  default: launchRoutes
  launchRoutes: launchRoutes
}