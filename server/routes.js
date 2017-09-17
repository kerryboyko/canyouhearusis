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
  app.use(
    bodyParser.json({
      limit: "100mb"
    })
  );
  app.use(
    bodyParser.urlencoded({
      limit: "100mb",
      extended: true
    })
  );

  app.get("/api/test", (req, res) => {
    console.log(req.body);
    res.send("body" + JSON.stringify(req.body) + "answer: Foo");
  });

  app.get("/dirname", (req, res) => {
    let items = {
      __dirname: __dirname,
      DIST: DIST,
      "sending file": path.join(__dirname, "../dist/index.html")
    };
    res.send(JSON.stringify(items, null, 2));
  });

  // to serve the pages.
  app.use(express.static(__dirname + '/'));

  // to serve the pages.
  app.use("/pdf", express.static(path.join(__dirname, "../src/pdf")));
  app.use(
    "/favicon.ico",
    express.static(path.join(__dirname, "../src/img/favicon.ico"))
  );
  app.use("/img", express.static(path.join(__dirname, "../src/img")));
};

module.exports = {
  default: launchRoutes,
  launchRoutes: launchRoutes
};
