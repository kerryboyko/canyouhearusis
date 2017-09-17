var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
var pick = require("lodash.pick");
var path = require("path");

var DIST = path.join(__dirname, "../dist"); 

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

  app.get('/api/test', (req, res) => {
    console.log(req.body);
    res.send("body" + JSON.stringify(req.body) + "answer: Foo");
  });

  app.get('/dirname', (req, res) => {
    res.send("__dirname: " + __dirname)
  })
  // to serve the pages.
  app.use("/", express.static(DIST));
  app.use("/about", express.static(DIST));
  app.use("/constitution", express.static(DIST));
  app.use("/learn", express.static(DIST));
  app.use("/thankyou", express.static(DIST));
  app.use("/subscribe", express.static(DIST));
  app.use("/parties", express.static(DIST));
  app.use("/pdf", express.static(path.join(__dirname, "../src/pdf")));
  app.use("/land", express.static(DIST));
  app.use("/is", express.static(DIST));
  app.use("/en", express.static(DIST));
  app.use("/favicon.ico", express.static(path.join(__dirname, "../src/img/favicon.ico")));
  app.use("/img", express.static(path.join(__dirname, "../src/img")));
  app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "../dist/index.html"))
  })
};

module.exports = {
  default: launchRoutes,
  launchRoutes: launchRoutes
}