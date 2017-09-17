"use strict";

var port = process.env.PORT || 3000;
var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
var pick = require("lodash.pick");
var DIST_DIR = path.join(__dirname, "../dist");

var launchRoutes = function launchRoutes(server, app) {
  server.listen(port, function () {
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
  app.use("/", express.static(path.join(__dirname, "../dist")));
  app.use("/about", express.static(path.join(__dirname, "../dist")));
  app.use("/constitution", express.static(path.join(__dirname, "../dist")));
  app.use("/learn", express.static(path.join(__dirname, "../dist")));
  app.use("/thankyou", express.static(path.join(__dirname, "../dist")));
  app.use("/subscribe", express.static(path.join(__dirname, "../dist")));
  app.use("/parties", express.static(path.join(__dirname, "../dist")));
  app.use("/pdf", express.static(path.join(__dirname, "../src/pdf")));
  app.use("/land", express.static(path.join(__dirname, "../dist")));
  app.use("/is", express.static(path.join(__dirname, "../dist")));
  app.use("/en", express.static(path.join(__dirname, "../dist")));
  app.use("/favicon.ico", express.static(path.join(__dirname, "../src/img/favicon.ico")));
  app.use("/img", express.static(path.join(__dirname, "../src/img")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });
};

module.exports = {
  default: launchRoutes,
  launchRoutes: launchRoutes
};