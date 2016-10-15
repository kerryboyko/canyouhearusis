"use strict";
// ******************
// REQUIREMENTS
// ******************

var port = process.env.PORT || 3000;
var express = require('express');
var http = require('http');
// use the key from the server, or if we're in local dev, from the secrets.js
// file that I have not shared to Github for obvious reasons.
var app = express();
var server = http.Server(app);

var routes = require('./routes');
routes.launchRoutes(server, app);