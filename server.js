"use strict";
// ******************
// REQUIREMENTS
// ******************

const port = process.env.PORT || 3000;
const express = require('express');
const http = require('http');
// use the key from the server, or if we're in local dev, from the secrets.js
// file that I have not shared to Github for obvious reasons.
const app = express();
const server = http.Server(app);

const routes = require('./backdist/routes');
routes.launchRoutes(server, app);
